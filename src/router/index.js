import Vue from 'vue'
import Router from 'vue-router'
import Padle from '@/components/PadleBoll'
import Aliens from '@/components/Aliens'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/padle',
      name: 'Padle',
      component: Padle
    },
    {
      path: '/aliens',
      name: 'Aliens',
      component: Aliens
    }
  ],
  mode: 'history'
})
