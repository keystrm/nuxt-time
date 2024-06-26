<script setup lang='ts'>
import { computed, getCurrentInstance, useNuxtApp, useHead } from '#imports'
import scriptContents from '#build/nuxt-time-script.mjs'

const props = withDefaults(defineProps<{
  locale?: string
  datetime: string | number | Date
  localeMatcher?: 'best fit' | 'lookup'
  weekday?: 'long' | 'short' | 'narrow'
  era?: 'long' | 'short' | 'narrow'
  year?: 'numeric' | '2-digit'
  month?: 'numeric' | '2-digit' | 'long' | 'short' | 'narrow'
  day?: 'numeric' | '2-digit'
  hour?: 'numeric' | '2-digit'
  minute?: 'numeric' | '2-digit'
  second?: 'numeric' | '2-digit'
  timeZoneName?: 'short' | 'long' | 'shortOffset' | 'longOffset' | 'shortGeneric' | 'longGeneric'
  formatMatcher?: 'best fit' | 'basic'
  hour12?: boolean
  timeZone?: string

  calendar?: string
  dayPeriod?: 'narrow' | 'short' | 'long'
  numberingSystem?: string

  dateStyle?: 'full' | 'long' | 'medium' | 'short'
  timeStyle?: 'full' | 'long' | 'medium' | 'short'
  hourCycle?: 'h11' | 'h12' | 'h23' | 'h24'
}>(), {
  hour12: undefined,
})

const el = getCurrentInstance()?.vnode.el
const renderedDate = el?.getAttribute('datetime')
const _locale = el?.getAttribute('data-locale')

const nuxtApp = useNuxtApp()

const date = computed(() => {
  const date = props.datetime
  if (renderedDate && nuxtApp.isHydrating) return new Date(renderedDate)
  if (!props.datetime) return new Date()
  return new Date(date)
})

const formatter = computed(() => {
  const { locale: propsLocale, ...rest } = props
  return new Intl.DateTimeFormat(_locale ?? propsLocale, rest)
})
const formattedDate = computed(() => formatter.value.format(date.value))
const isoDate = computed(() => date.value.toISOString())

const dataset: Record<string, string | number | boolean | Date | undefined> = {}

if (import.meta.server) {
  for (const prop in props) {
    if (prop !== 'datetime') {
      const propInKebabCase = prop.split(/(?=[A-Z])/).join('-')
      dataset[`data-${propInKebabCase}`] = props?.[prop as keyof typeof props]
    }
  }
  useHead({
    script: [{
      tagPosition: 'bodyClose',
      tagPriority: -20,
      key: 'nuxt-time',
      innerHTML: scriptContents,
    }],
  })
}
</script>

<template>
  <time
    data-n-time
    v-bind="dataset"
    :datetime="isoDate"
  >{{ formattedDate }}</time>
</template>
