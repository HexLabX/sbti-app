export function useShare() {
  async function copyToClipboard(text: string): Promise<boolean> {
    try {
      await navigator.clipboard.writeText(text)
      return true
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement('textarea')
      textarea.value = text
      textarea.style.position = 'fixed'
      textarea.style.opacity = '0'
      document.body.appendChild(textarea)
      textarea.select()
      try {
        document.execCommand('copy')
        return true
      } catch {
        return false
      } finally {
        document.body.removeChild(textarea)
      }
    }
  }

  async function share(options: { title?: string; text?: string; url?: string }): Promise<boolean> {
    // Try Web Share API first
    if (navigator.share) {
      try {
        await navigator.share(options)
        return true
      } catch {
        // User cancelled or error
        return false
      }
    }

    // Fallback to clipboard
    const shareText = [options.title, options.text, options.url].filter(Boolean).join('\n')
    return copyToClipboard(shareText)
  }

  return { share, copyToClipboard }
}
