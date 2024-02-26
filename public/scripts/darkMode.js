document.addEventListener('DOMContentLoaded', () => {
  const documentElement = document.documentElement
  const toggleSwitch = document.getElementById('dark-mode-switch')

  function updateToggleSwitch() {
    const isDarkMode = documentElement.classList.contains('dark')
    // @ts-expect-error
    toggleSwitch.classList.toggle('darkmode-toggle--checked', isDarkMode)
    // @ts-expect-error
    toggleSwitch.querySelector('.darkmode-toggle-screenreader-only').checked =
      isDarkMode
  }

  function toggleDarkMode() {
    documentElement.classList.toggle('dark')
    // Save the user's preference in localStorage
    if (documentElement.classList.contains('dark')) {
      localStorage.setItem('theme', 'dark')
    } else {
      localStorage.setItem('theme', 'light')
    }
    // Update the toggle switch appearance
    updateToggleSwitch()
  }

  // Set initial theme based on localStorage or system preference
  if (
    localStorage.getItem('theme') === 'dark' ||
    (!('theme' in localStorage) &&
      window.matchMedia('(prefers-color-scheme: dark)').matches)
  ) {
    documentElement.classList.add('dark')
  } else {
    documentElement.classList.remove('dark')
  }
  // Initialize toggle switch appearance based on the current theme
  updateToggleSwitch()

  // Add click event listener to the toggle switch
  // @ts-expect-error
  toggleSwitch.addEventListener('click', toggleDarkMode)
})
