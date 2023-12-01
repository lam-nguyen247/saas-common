<script setup>
import { getComputedNavLinkToProp } from '@layouts/utils'

const props = defineProps({
  item: {
    type: null,
    required: true,
  },
})
</script>

<template>
  <li
    class="nav-link"
    :class="{ disabled: item.disable, 'nav-link-active': item.active }"
  >
    <Component :is="item.to ? 'RouterLink' : 'a'">
      <VIcon
        v-bind="item.icon"
        class="nav-item-icon"
      />
      <TransitionGroup name="transition-slide-x">
        <!-- 👉 Title -->
        <span
          key="title"
          class="nav-item-title"
        >
          {{ item.title }}
        </span>

        <!-- 👉 Badge -->
        <span
          v-if="item.badgeContent"
          key="badge"
          class="nav-item-badge"
          :class="item.badgeClass"
        >
          {{ item.badgeContent }}
        </span>
      </TransitionGroup>
    </Component>
  </li>
</template>

<style lang="scss">
.layout-vertical-nav {
  .nav-link a {
    display: flex;
    align-items: center;
    cursor: pointer;
    width: 100% !important;
  }
  .nav-link {
    &:first-child {
      transition: margin-inline 0.15s ease-in-out;
      will-change: margin-inline;
      block-size: 2.625rem !important;
      border-end-end-radius: 3.125rem !important;
      border-end-start-radius: 0 !important;
      border-start-end-radius: 3.125rem !important;
      border-start-start-radius: 0 !important;
      border-radius: 0.4rem;
      margin-block-end: 0.375rem;
      margin-block: 0;
      margin-inline: 0;
      padding-block: 0;
      padding-inline: 0;
      white-space: nowrap;
    }
  }
  .nav-link-active a {
    background: rgb(var(--v-theme-primary)) !important;
    background: linear-gradient(
      -72.47deg,
      rgb(var(--v-theme-primary)) 22.16%,
      rgba(var(--v-theme-primary), 0.7) 76.47%
    ) !important;
    color: rgb(var(--v-theme-on-primary)) !important;
    box-shadow: 0 4px 14px -4px var(--v-shadow-key-umbra-opacity), 0 4px 8px -4px var(--v-shadow-key-penumbra-opacity),
      0 4px 8px -4px var(--v-shadow-key-ambient-opacity);
  }
  .nav-link a {
    &:before {
      position: absolute;
      border-radius: inherit;
      background: currentcolor;
      block-size: 100%;
      content: '';
      inline-size: 100%;
      inset: 0;
      opacity: 0;
      pointer-events: none;
    }
  }
}
</style>
