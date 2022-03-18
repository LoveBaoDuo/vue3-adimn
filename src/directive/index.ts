import { App } from 'vue'
const imgUrl = new URL('../assets/logo.png', import.meta.url).href
export default {
  install(app: App) {
    app.directive('lazyimage', {
      mounted(el: HTMLImageElement, binding) {
        const oi = new IntersectionObserver(([{ isIntersecting }]) => {
          if (isIntersecting) {
            el.src = binding.value
            oi.unobserve(el)
          }
        })
        oi.observe(el)
        el.onerror = function (e: any) {
          e.target.src = imgUrl
        }
      },
    })
  },
}
