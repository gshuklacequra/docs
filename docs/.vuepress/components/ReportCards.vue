<script setup>
import { RouteLink } from 'vuepress/client'

// Injected at build time by config.js (one entry per report folder, newest first).
// eslint-disable-next-line no-undef
const REPORTS = __REPORTS__

const formatDate = (iso) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  })
</script>

<template>
  <section id="reports" class="report-cards">
    <RouteLink v-for="report in REPORTS" :key="report.slug" :to="`/${report.slug}/`" class="report-card">
      <div class="report-card__meta">
        <span class="report-card__label">Threat report</span>
        <span>{{ formatDate(report.published) }}</span>
      </div>
      <h3 class="report-card__title">{{ report.title }}</h3>
      <p class="report-card__summary">{{ report.summary }}</p>
      <dl class="report-card__stats">
        <div v-for="[value, label] in report.stats" :key="label">
          <dt>{{ value }}</dt>
          <dd>{{ label }}</dd>
        </div>
      </dl>
      <div class="report-card__footer">
        <span class="report-card__tags">
          <span v-for="tag in report.tags" :key="tag" class="report-card__tag">{{ tag }}</span>
        </span>
        <span class="report-card__cta">Read the report →</span>
      </div>
      <div class="report-card__period">Data: {{ report.period }}</div>
    </RouteLink>
  </section>
</template>
