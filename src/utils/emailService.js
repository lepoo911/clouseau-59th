/**
 * Email Service for lePoo's 59th Birthday
 * Handles background transmission and generates a rich HTML email mimicking the in-app dispatch letter.
 */

const GITHUB_PAGES_BASE = 'https://lepoo911.github.io/clouseau-59th';
export const RECIPIENT_EMAIL = 'tubywuby@gmail.com';
export const CC_EMAILS = 'clairedec42@yahoo.com, erhardbuchholz@gmail.com';
export const GOOGLE_SCRIPT_WEBHOOK_URL = 'https://script.google.com/macros/s/AKfycbzCXlCltSO1j4HqnaAOns0n6xlvvZAbFQurR773WX2cVKc_2d_EBxN2DDASSA3EulSzqQ/exec';

/**
 * Generates an email-safe, responsive HTML letter mimicking the in-app memo card.
 */
export function generateRichEmailHtml({
  selectedLocation,
  selectedTime,
  punchline,
  letter = {},
  lang = 'en',
  isSimulation = false
}) {
  const toName = letter.toName || 'Chief Inspector Jacques Clouseau';
  const fromName = letter.fromName || 'Claire & Erhard (EB) ⛳';
  const subject = letter.subject || 'Official 19th Hole Verdict • Birthday #59';
  const salutation = letter.salutation || 'Dear Jacques,';
  const opening = letter.opening || 'After calculating the wind drift and sinking a solid gold putt on the greens, our official scorecard is in! For your 59th birthday celebration, we hereby confirm our arrival at:';
  const closingRule = letter.closingRule || 'Save our table at the clubhouse — no mulligans allowed on your 59th!';
  const signoff = letter.signoff || 'Yours on the greens & in mystery,';
  const signature = letter.signature || 'EB & Claire ⛳🏌️‍♂️';
  const stampBadge = letter.stampBadge || 'VERDICT CONFIRMED • 19TH HOLE';

  // Absolute URLs for images so email clients display them
  const bannerImgUrl = `${GITHUB_PAGES_BASE}/assets/erhard_claire_happy.png`;
  
  const rawLocImg = selectedLocation?.image || 'assets/venue_home.jpg';
  const cleanLocImg = rawLocImg.startsWith('/') ? rawLocImg.slice(1) : rawLocImg;
  const locImgUrl = `${GITHUB_PAGES_BASE}/${cleanLocImg}`;

  const locTitle = selectedLocation?.title || 'Chez Jacques (38 Saratoga)';
  const locAddress = selectedLocation?.address || '';

  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${subject}</title>
</head>
<body style="margin:0; padding:20px 10px; background-color:#f4f1ea; font-family:'Georgia', Times, serif; color:#1c1917;">
  <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width:600px; margin:0 auto;">
    <tr>
      <td>
        <!-- Dispatch Letter Card -->
        <div style="background-color:#fdfcf7; border:3px solid #b45309; border-radius:18px; padding:24px 20px; box-shadow:0 10px 25px rgba(0,0,0,0.08);">
          
          ${isSimulation ? `
          <div style="background-color:#fef3c7; border:2px dashed #d97706; padding:8px 12px; margin-bottom:14px; text-align:center; font-family:sans-serif; font-size:12px; font-weight:bold; color:#92400e; border-radius:8px;">
            🎮 SIMULATION TEST MODE — No emails sent to Claire or EB
          </div>` : ''}

          <!-- Top Header: TO / FROM / CC / RE + 59c Stamp -->
          <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="border-bottom:1px solid #d97706; padding-bottom:14px; margin-bottom:16px;">
            <tr>
              <td valign="top" style="font-family:'Courier New', Courier, monospace; font-size:13px; line-height:1.6; color:#1c1917;">
                <div><span style="color:#78350f; font-weight:bold;">TO :</span> <strong>${toName}</strong></div>
                <div><span style="color:#78350f; font-weight:bold;">FROM :</span> <strong>${fromName}</strong></div>
                <div><span style="color:#78350f; font-weight:bold;">CC :</span> <span style="color:#57534e; font-size:11px;">${isSimulation ? '(Disabled in simulation mode)' : 'clairedec42@yahoo.com, erhardbuchholz@gmail.com'}</span></div>
                <div><span style="color:#78350f; font-weight:bold;">RE :</span> <span style="color:#047857; font-weight:bold;">${subject}</span></div>
              </td>
              <td valign="top" align="right" style="width:75px; padding-left:10px;">
                <!-- 59c Postage Stamp -->
                <div style="border:2px dashed #b45309; border-radius:6px; background-color:#fef3c7; padding:4px 6px; text-align:center; font-family:'Courier New', Courier, monospace; line-height:1.1; width:60px;">
                  <div style="font-size:10px; font-weight:bold; color:#78350f;">59¢</div>
                  <div style="font-size:12px; margin:2px 0;">⛳</div>
                  <div style="font-size:7px; font-weight:bold; color:#57534e; text-transform:uppercase; letter-spacing:0.5px;">SÛRETÉ</div>
                </div>
              </td>
            </tr>
          </table>

          <!-- Portrait Banner of EB & Claire with Unanimous Badge -->
          <div style="border:2px solid #f59e0b; border-radius:14px; overflow:hidden; margin-bottom:16px; background-color:#fef3c7; text-align:center;">
            <img src="${bannerImgUrl}" alt="EB & Claire" width="100%" style="width:100%; max-height:220px; object-fit:cover; display:block;" />
            <div style="background-color:#047857; color:#ffffff; font-family:'Courier New', Courier, monospace; font-size:11px; font-weight:bold; padding:5px 12px; text-align:center; letter-spacing:0.5px;">
              🤝 UNANIMOUS DECISION • VOTE OFFICIEL CONFIRMÉ
            </div>
          </div>

          <!-- Salutation & Scorecard Intro -->
          <h2 style="font-size:20px; font-weight:bold; margin:0 0 10px 0; color:#0c0a09; font-family:'Georgia', Times, serif;">
            ${salutation}
          </h2>
          <p style="font-size:14px; line-height:1.55; color:#292524; margin:0 0 16px 0;">
            ${opening}
          </p>

          <!-- Venue Decision Box -->
          <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color:#fef3c7; border:2px solid #fcd34d; border-radius:12px; padding:12px; margin-bottom:16px;">
            <tr>
              <td valign="middle" style="width:80px; padding-right:12px;">
                <img src="${locImgUrl}" alt="${locTitle}" width="75" height="75" style="width:75px; height:75px; border-radius:10px; object-fit:cover; border:1px solid #d97706; display:block;" />
              </td>
              <td valign="middle">
                <div style="font-size:17px; font-weight:bold; color:#0c0a09; margin-bottom:6px; font-family:'Georgia', Times, serif;">
                  ${locTitle}
                </div>
                ${locAddress ? `<div style="font-size:11px; color:#57534e; margin-bottom:6px; font-family:sans-serif;">${locAddress}</div>` : ''}
                <span style="display:inline-block; background-color:#047857; color:#ffffff; padding:4px 10px; border-radius:6px; font-family:'Courier New', Courier, monospace; font-size:13px; font-weight:bold;">
                  🕒 ${selectedTime}
                </span>
              </td>
            </tr>
          </table>

          <!-- Location Punchline / 19th Hole Debrief -->
          ${punchline ? `
          <div style="background-color:#f0fdf4; border-left:4px solid #059669; border-radius:0 8px 8px 0; padding:10px 14px; margin-bottom:16px; font-style:italic; font-size:13px; line-height:1.5; color:#1c1917;">
            ${punchline}
          </div>
          ` : ''}

          <!-- Closing Rule -->
          <p style="font-size:13px; line-height:1.5; color:#44403c; margin:0 0 18px 0; font-style:italic;">
            « ${closingRule} »
          </p>

          <!-- Sign-Off & Official Stamp -->
          <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="border-top:1px solid #e7e5e4; padding-top:14px;">
            <tr>
              <td valign="bottom">
                <div style="font-size:13px; color:#57534e; font-style:italic; margin-bottom:2px;">
                  ${signoff}
                </div>
                <div style="font-size:17px; font-weight:bold; color:#78350f;">
                  ${signature}
                </div>
              </td>
              <td valign="bottom" align="right">
                <!-- Red Rubber Stamp -->
                <div style="display:inline-block; border:2px solid #b91c1c; color:#b91c1c; padding:5px 10px; border-radius:6px; font-family:'Courier New', Courier, monospace; font-size:10px; font-weight:bold; text-transform:uppercase; letter-spacing:0.8px; background-color:#fef2f2;">
                  ${stampBadge}
                </div>
              </td>
            </tr>
          </table>

        </div>

        <!-- Footer note -->
        <div style="text-align:center; padding-top:12px; font-size:11px; color:#78716c; font-family:sans-serif;">
          Transmitted from the Sûreté Nationale Briefing Terminal • Mission lePoo's 59
        </div>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

/**
 * Transmits the verdict email in the background to tubywuby@gmail.com.
 * Uses FormSubmit AJAX with full structured payload, and falls back gracefully.
 */
export async function sendVerdictInBackground({
  selectedLocation,
  selectedTime,
  punchline,
  letter = {},
  lang = 'en',
  isSimulation = false
}) {
  const recipient = RECIPIENT_EMAIL;
  // In simulation mode, strictly ZERO emails to Claire or EB!
  const ccRecipient = isSimulation ? '' : CC_EMAILS;
  const subject = isSimulation
    ? `[SIMULATION TEST] lePoo's 59 - Official Verdict: ${selectedLocation?.title || 'Venue'} at ${selectedTime || ''} ⛳`
    : `lePoo's 59 - Official Verdict: ${selectedLocation?.title || 'Venue'} at ${selectedTime || ''} ⛳`;

  const htmlBody = generateRichEmailHtml({
    selectedLocation,
    selectedTime,
    punchline,
    letter,
    lang,
    isSimulation
  });

  // 1. Primary: Transmit rich HTML email via Google Apps Script Webhook
  const webhookUrl = (typeof window !== 'undefined' && localStorage.getItem('lepoo_webhook_url')) || GOOGLE_SCRIPT_WEBHOOK_URL;

  if (webhookUrl) {
    try {
      await fetch(webhookUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({
          to: recipient,
          cc: ccRecipient,
          subject,
          htmlBody
        })
      });
      return { success: true, method: 'google_script', isSimulation };
    } catch (e) {
      console.warn('Google Apps Script webhook transmission failed, trying FormSubmit fallback:', e);
    }
  }

  // 2. Transmit via FormSubmit AJAX endpoint
  const payload = {
    _subject: subject,
    _cc: CC_EMAILS,
    _template: 'box',
    TO: letter.toName || 'Chief Inspector Jacques Clouseau',
    FROM: letter.fromName || 'Claire & Erhard (EB) ⛳',
    RE: letter.subject || 'Official 19th Hole Verdict • Birthday #59',
    Venue_Choice: selectedLocation?.title || '',
    Arrival_Time: selectedTime || '',
    Debrief_Punchline: punchline || '',
    Clubhouse_Rule: letter.closingRule || 'No mulligans allowed on your 59th!',
    Signoff: `${letter.signoff || ''} ${letter.signature || 'EB & Claire ⛳'}`,
    Official_Seal: letter.stampBadge || 'VERDICT CONFIRMED • 19TH HOLE',
    _html: htmlBody
  };

  try {
    const resp = await fetch(`https://formsubmit.co/ajax/${recipient}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const data = await resp.json().catch(() => ({}));
    
    if (data.success === 'true' || data.success === true) {
      return { success: true, method: 'formsubmit' };
    }

    if (data.message && data.message.includes('Activation')) {
      return {
        success: false,
        needsActivation: true,
        message: "Activation email was sent to tubywuby@gmail.com! Please click 'Activate Form' in your inbox to enable instant background sends."
      };
    }

    return {
      success: false,
      message: data.message || 'Transmission could not be confirmed'
    };
  } catch (err) {
    console.warn('Background submission error:', err);
    return {
      success: false,
      message: err.message || 'Network error during background transmission'
    };
  }
}
