import { defineClientConfig } from 'vuepress/client'

import ReportCards from './components/ReportCards.vue'

export default defineClientConfig({
  enhance({ app }) {
    app.component('ReportCards', ReportCards)
  },
})
