/**
 * Copies text to the clipboard.
 *
 * `navigator.clipboard` only exists in a secure context (https, or localhost),
 * so on a plain-http host — a LAN IP during development, an internal
 * deployment — the property is undefined and reading `.writeText` throws.
 * Fall back to the legacy `execCommand('copy')` over an offscreen textarea,
 * which works anywhere.
 *
 * @returns {Promise<boolean>} whether the text landed on the clipboard.
 */
export const copyToClipboard = async (text) => {
  const value = String(text ?? '');

  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(value);
      return true;
    } catch (error) {
      // Permission denied or a transient failure — try the fallback below.
      console.warn('Clipboard API copy failed, falling back:', error);
    }
  }

  return legacyCopy(value);
};

const legacyCopy = (value) => {
  if (typeof document === 'undefined' || !document.body) return false;

  const textarea = document.createElement('textarea');
  textarea.value = value;
  textarea.setAttribute('readonly', '');
  // Keep it out of sight and stop iOS from scrolling to it.
  textarea.style.position = 'fixed';
  textarea.style.top = '0';
  textarea.style.left = '-9999px';
  textarea.style.opacity = '0';

  document.body.appendChild(textarea);

  const selection = document.getSelection();
  const previousRange = selection?.rangeCount > 0 ? selection.getRangeAt(0) : null;

  try {
    textarea.focus();
    textarea.select();
    textarea.setSelectionRange(0, value.length);
    return document.execCommand('copy');
  } catch (error) {
    console.error('Fallback copy failed:', error);
    return false;
  } finally {
    document.body.removeChild(textarea);

    if (previousRange && selection) {
      selection.removeAllRanges();
      selection.addRange(previousRange);
    }
  }
};
