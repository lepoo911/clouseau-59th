// Two-user real-time voting state manager for Erhard & Claire
import { parseUrlParams, syncUrlParams } from './urlState';

export const USERS = {
  erhard: {
    id: 'erhard',
    name: 'Erhard',
    roleLabel: 'EB',
    colorName: 'blue',
    hex: '#2563eb',
    badgeBg: 'bg-blue-600 text-white',
    ringColor: 'ring-blue-500',
    borderColor: 'border-blue-500',
    lightBg: 'bg-blue-50',
    dotColor: 'bg-blue-500',
    avatar: 'assets/erhard_avatar.png',
    emoji: '👨‍🦳'
  },
  claire: {
    id: 'claire',
    name: 'Claire',
    roleLabel: 'Claire',
    colorName: 'rose',
    hex: '#e11d48',
    badgeBg: 'bg-rose-600 text-white',
    ringColor: 'ring-rose-500',
    borderColor: 'border-rose-500',
    lightBg: 'bg-rose-50',
    dotColor: 'bg-rose-500',
    avatar: 'assets/claire_avatar.png',
    emoji: '👩‍🦳'
  }
};

const STORAGE_KEY = 'birthday_voting_v2';
const USER_STORAGE_KEY = 'birthday_voting_current_user';

class VotingManager {
  constructor() {
    this.listeners = new Set();
    this.votes = {
      erhard: { locationId: null, time: null },
      claire: { locationId: null, time: null }
    };
    this.currentUser = 'erhard';
    this.channel = null;
    this.isSimulation = false;
    this.storageKey = STORAGE_KEY;
    this.userStorageKey = USER_STORAGE_KEY;
    this.channelName = 'birthday_voting_channel';

    if (typeof window !== 'undefined') {
      const urlParams = parseUrlParams();
      this.isSimulation = Boolean(urlParams.isSimulation);

      if (this.isSimulation) {
        this.storageKey = 'birthday_voting_sandbox';
        this.userStorageKey = 'birthday_voting_sandbox_user';
        this.channelName = 'birthday_voting_sandbox_channel';
      }

      // 1. Determine current user from URL or storage
      if (urlParams.user && (urlParams.user === 'erhard' || urlParams.user === 'claire')) {
        this.currentUser = urlParams.user;
      } else {
        const storedUser = localStorage.getItem(this.userStorageKey);
        if (storedUser === 'erhard' || storedUser === 'claire') {
          this.currentUser = storedUser;
        }
      }

      // 2. Load stored votes from isolated localStorage if available
      try {
        const raw = localStorage.getItem(this.storageKey);
        if (raw) {
          const parsed = JSON.parse(raw);
          if (parsed?.erhard && parsed?.claire) {
            this.votes = parsed;
          }
        }
      } catch {
        // Fallback to empty votes
      }

      // 3. Seed votes from URL parameters (supports cross-device link sharing)
      if (urlParams.e_spot) this.votes.erhard.locationId = urlParams.e_spot;
      if (urlParams.e_time) this.votes.erhard.time = urlParams.e_time;
      if (urlParams.c_spot) this.votes.claire.locationId = urlParams.c_spot;
      if (urlParams.c_time) this.votes.claire.time = urlParams.c_time;

      // Fallback: If legacy URL params had spot/time, seed active user's vote
      if (urlParams.spot && !this.votes[this.currentUser].locationId) {
        this.votes[this.currentUser].locationId = urlParams.spot;
      }
      if (urlParams.time && !this.votes[this.currentUser].time) {
        this.votes[this.currentUser].time = urlParams.time;
      }

      // 4. Setup BroadcastChannel for sub-millisecond tab-to-tab sync
      try {
        if ('BroadcastChannel' in window) {
          this.channel = new BroadcastChannel(this.channelName);
          this.channel.onmessage = (event) => {
            if (event.data?.type === 'VOTES_UPDATED' && event.data?.votes) {
              this.votes = event.data.votes;
              this.notify();
            }
          };
        }
      } catch {
        // BroadcastChannel unavailable
      }

      // 5. Fallback cross-tab sync via storage events
      window.addEventListener('storage', (e) => {
        if (e.key === this.storageKey && e.newValue) {
          try {
            const incoming = JSON.parse(e.newValue);
            if (incoming?.erhard && incoming?.claire) {
              this.votes = incoming;
              this.notify();
            }
          } catch {
            // Ignore parse errors
          }
        }
      });
    }
  }

  saveAndBroadcast() {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.votes));
      localStorage.setItem(this.userStorageKey, this.currentUser);

      // Keep URL updated with state so if link is copied/shared it reflects current selections
      const params = new URLSearchParams(window.location.search);
      if (this.isSimulation) {
        params.set('mode', 'simulation');
      }
      params.set('user', this.currentUser);
      if (this.votes.erhard.locationId) params.set('e_spot', this.votes.erhard.locationId);
      else params.delete('e_spot');
      if (this.votes.erhard.time) params.set('e_time', this.votes.erhard.time);
      else params.delete('e_time');
      if (this.votes.claire.locationId) params.set('c_spot', this.votes.claire.locationId);
      else params.delete('c_spot');
      if (this.votes.claire.time) params.set('c_time', this.votes.claire.time);
      else params.delete('c_time');
      
      const newPath = `${window.location.pathname}?${params.toString()}`;
      window.history.replaceState(null, '', newPath);

      if (this.channel) {
        this.channel.postMessage({
          type: 'VOTES_UPDATED',
          votes: this.votes,
          sender: this.currentUser,
          timestamp: Date.now()
        });
      }
    } catch {
      // Ignore storage errors
    }
  }

  subscribe(callback) {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }

  notify() {
    const state = this.getState();
    this.listeners.forEach((cb) => {
      try {
        cb(state);
      } catch (err) {
        console.error('Error in votingState listener:', err);
      }
    });
  }

  getState() {
    const isLocUnanimous = Boolean(
      this.votes.erhard.locationId &&
      this.votes.claire.locationId &&
      this.votes.erhard.locationId === this.votes.claire.locationId
    );

    const isTimeUnanimous = Boolean(
      this.votes.erhard.time &&
      this.votes.claire.time &&
      this.votes.erhard.time === this.votes.claire.time
    );

    return {
      votes: this.votes,
      currentUser: this.currentUser,
      otherUser: this.currentUser === 'erhard' ? 'claire' : 'erhard',
      isLocationUnanimous: isLocUnanimous,
      isTimeUnanimous: isTimeUnanimous,
      isUnanimous: isLocUnanimous && isTimeUnanimous,
      agreedLocationId: isLocUnanimous ? this.votes.erhard.locationId : null,
      agreedTime: isTimeUnanimous ? this.votes.erhard.time : null,
      erhardVote: this.votes.erhard,
      claireVote: this.votes.claire,
      isSimulation: this.isSimulation
    };
  }

  setCurrentUser(user) {
    if (user !== 'erhard' && user !== 'claire') return;
    this.currentUser = user;
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(this.userStorageKey, user);
        syncUrlParams({ user });
      } catch {
        // Ignore
      }
    }
    this.notify();
  }

  voteLocation(locationId, user = this.currentUser) {
    if (!this.votes[user]) return;
    // Toggle off if already selected by this user
    if (this.votes[user].locationId === locationId) {
      this.votes[user].locationId = null;
    } else {
      this.votes[user].locationId = locationId;
    }
    this.saveAndBroadcast();
    this.notify();
  }

  voteTime(time, user = this.currentUser) {
    if (!this.votes[user]) return;
    // Toggle off if already selected by this user
    if (this.votes[user].time === time) {
      this.votes[user].time = null;
    } else {
      this.votes[user].time = time;
    }
    this.saveAndBroadcast();
    this.notify();
  }

  resetVotes() {
    this.votes = {
      erhard: { locationId: null, time: null },
      claire: { locationId: null, time: null }
    };
    this.saveAndBroadcast();
    this.notify();
  }

  toggleSimulation() {
    this.isSimulation = !this.isSimulation;
    if (this.isSimulation) {
      this.storageKey = 'birthday_voting_sandbox';
      this.userStorageKey = 'birthday_voting_sandbox_user';
      this.channelName = 'birthday_voting_sandbox_channel';
    } else {
      this.storageKey = STORAGE_KEY;
      this.userStorageKey = USER_STORAGE_KEY;
      this.channelName = 'birthday_voting_channel';
    }

    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (this.isSimulation) {
        params.set('mode', 'simulation');
      } else {
        params.delete('mode');
        params.delete('test');
        params.delete('sandbox');
      }
      const search = params.toString();
      const newPath = search ? `${window.location.pathname}?${search}` : window.location.pathname;
      window.history.replaceState(null, '', newPath);
    }
    this.saveAndBroadcast();
    this.notify();
  }

  setVotesForSimulation(erhardVote, claireVote) {
    if (erhardVote) this.votes.erhard = { ...this.votes.erhard, ...erhardVote };
    if (claireVote) this.votes.claire = { ...this.votes.claire, ...claireVote };
    this.saveAndBroadcast();
    this.notify();
  }
}

export const votingManager = new VotingManager();
