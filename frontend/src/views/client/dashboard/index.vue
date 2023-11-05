<script setup>
import AnalyticsAward from '@/views/client/dashboard/components/analytics/AnalyticsAward.vue'
import AnalyticsBarCharts from '@/views/client/dashboard/components/analytics/AnalyticsBarCharts.vue'
import AnalyticsDatatable from '@/views/client/dashboard/components/analytics/AnalyticsDatatable.vue'
import AnalyticsDepositWithdraw from '@/views/client/dashboard/components/analytics/AnalyticsDepositWithdraw.vue'
import AnalyticsSalesByCountries from '@/views/client/dashboard/components/analytics/AnalyticsSalesByCountries.vue'
import AnalyticsTotalEarning from '@/views/client/dashboard/components/analytics/AnalyticsTotalEarning.vue'
// import AnalyticsTotalProfitLineCharts from '@/views/client/dashboard/components/analytics/AnalyticsTotalProfitLineCharts.vue'
import AnalyticsTransactions from '@/views/client/dashboard/components/analytics/AnalyticsTransactions.vue'
import AnalyticsWeeklyOverview from '@/views/client/dashboard/components/analytics/AnalyticsWeeklyOverview.vue'
import CardStatisticsVertical from '@core/components/CardStatisticsVertical.vue'

const totalProfit = {
  title: 'Total Profit',
  color: 'secondary',
  icon: 'mdi-poll',
  stats: '$25.6k',
  change: 42,
  subtitle: 'Weekly Project',
}
const newProject = {
  title: 'New Project',
  color: 'primary',
  icon: 'mdi-briefcase-variant-outline',
  stats: '862',
  change: -18,
  subtitle: 'Yearly Project',
}
</script>

<template>
  <VRow class="match-height">
    <VCol
      cols="12"
      md="4"
    >
      <AnalyticsAward />
    </VCol>

    <VCol
      cols="12"
      md="8"
    >
      <AnalyticsTransactions />
    </VCol>

    <VCol
      cols="12"
      md="4"
    >
      <AnalyticsWeeklyOverview />
    </VCol>

    <VCol
      cols="12"
      md="4"
    >
      <AnalyticsTotalEarning />
    </VCol>

    <VCol
      cols="12"
      md="4"
    >
      <VRow class="match-height">
        <VCol
          cols="12"
          sm="6"
        >
          <AnalyticsTotalProfitLineCharts />
        </VCol>

        <VCol
          cols="12"
          sm="6"
        >
          <CardStatisticsVertical v-bind="totalProfit" />
        </VCol>

        <VCol
          cols="12"
          sm="6"
        >
          <CardStatisticsVertical v-bind="newProject" />
        </VCol>

        <VCol
          cols="12"
          sm="6"
        >
          <AnalyticsBarCharts />
        </VCol>
      </VRow>
    </VCol>

    <VCol
      cols="12"
      md="4"
    >
      <AnalyticsSalesByCountries />
    </VCol>

    <VCol
      cols="12"
      md="8"
    >
      <AnalyticsDepositWithdraw />
    </VCol>

    <VCol cols="12">
      <AnalyticsDatatable />
    </VCol>
  </VRow>
</template>
