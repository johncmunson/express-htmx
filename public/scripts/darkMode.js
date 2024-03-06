document.addEventListener('DOMContentLoaded', () => {
  const documentElement = document.documentElement
  // Use querySelectorAll to target all switches and convert NodeList to Array for easier manipulation.
  // Yes, there are technically multiple switches on the page due to responsive layout needs.
  const toggleSwitches = Array.from(
    document.querySelectorAll('.darkmode-toggle')
  )

  function updateToggleSwitches() {
    const isDarkMode = documentElement.classList.contains('dark')
    toggleSwitches.forEach((switchElement) => {
      switchElement.classList.toggle('darkmode-toggle--checked', isDarkMode)
      // @ts-expect-error
      switchElement.querySelector(
        '.darkmode-toggle-screenreader-only'
        // @ts-expect-error
      ).checked = isDarkMode
    })
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
    updateToggleSwitches()
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
  updateToggleSwitches()

  // Add click event listener to all toggle switches
  toggleSwitches.forEach((switchElement) => {
    switchElement.addEventListener('click', toggleDarkMode)
  })
})
