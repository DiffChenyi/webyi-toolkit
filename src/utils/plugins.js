import 'normalize.css';
import Axios from 'axios';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueClipboard from 'vue-clipboard-plus';
VueClipboard.config.autoSetContainer = true
export default {
    install: function (Vue) {
        Object.defineProperty(Vue.prototype, '$axios', {
            value: Axios,
        });
        Vue.use(ElementUI);
        Vue.use(VueClipboard)
    },
};
