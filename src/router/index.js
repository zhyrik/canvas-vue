import Vue from 'vue'
import Router from 'vue-router'
import Padle from '@/components/PadleBoll'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/padle',
      name: 'Padle',
      component: Padle
    }
  ],
  mode: 'history'
})
