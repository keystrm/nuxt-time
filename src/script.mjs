document.querySelectorAll('[data-n-time]').forEach(el => {
  const toCamelCase = (name, index) => {
    if (index > 0) {
      return name[0].toUpperCase() + name.slice(1)
    }
    return name
  }

  let relative = false
  const date = new Date(el.getAttribute('datetime'))
  const currentDate = new Date()
  const options = {}
  for (const name of el.getAttributeNames()) {
    if (name.startsWith('data-')) {
      const optionName = name.slice(5).split('-').map(toCamelCase).join('')
      options[optionName] = el.getAttribute(name)
      if (optionName === 'relative') {
        relative = el.getAttribute(name) === 'true' ? true : false
      }
    }
  }

  if (relative) {
    const relativeFormatter = new Intl.RelativeTimeFormat(options.locale, options)
    const timeDifference = currentDate - date
    el.textContent = relativeFormatter.format((-timeDifference / (1000 * 60 * 60 * 24)), 'day')

  } else {
    const formatter = new Intl.DateTimeFormat(options.locale, options)
    el.textContent = formatter.format(date)
  }
})
