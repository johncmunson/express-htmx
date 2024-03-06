tailwind.config = {
  darkMode: 'class',
  theme: {
    extend: {
      screens: {
        '840bp': '840px',
        // Say you have className={`${MY_CLASSES}`} and you really want to
        // use all the styles that come with MY_CLASSES. But, maybe you don't
        // want the top margins that it comes with (at every min-width breakpoint).
        // This is a super convenient way to erase all the top margin styles...
        //   className={`${MY_CLASSES} -99xl:mt-0`}
        // Unfortunately, because this is still first and foremost a min-width
        // breakpoint system and because of how precedence works, you can't then
        // re-apply min-width classes once you've used -99xl to reset the top margin.
        // In other words, this will not work...
        //   className={`${MY_CLASSES} -99xl:mt-0 sm:mt-4`}
        //
        // UPDATE: Tailwind now supports max-width breakpoints, which makes this solution
        // unnecessary. Unfortunately, it doesn't seem like this feature is available in
        // the Tailwind CDN.
        // https://tailwindcss.com/docs/screens#max-width-breakpoints
        // https://tailwindcss.com/blog/tailwindcss-v3-2#max-width-and-dynamic-breakpoints
        '-99xl': { max: '99999px' },
        '-2xl': { max: '1535px' },
        '-xl': { max: '1279px' },
        '-lg': { max: '1023px' },
        '-md': { max: '767px' },
        '-sm': { max: '639px' },
      },
      colors: {
        // @ts-expect-error
        primary: tailwind.colors.sky,
      },
    },
  },
}
