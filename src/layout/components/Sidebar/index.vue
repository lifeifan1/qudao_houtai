<template>
  <div :class="{'has-logo':showLogo}">
    <logo v-if="showLogo" :collapse="isCollapse"/>
    <el-scrollbar wrap-class="scrollbar-wrapper">

      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
      <div style="text-align:center;padding:24px 0;">
          <img src="http://a4.att.hudong.com/21/09/01200000026352136359091694357.jpg" alt="用户头像" ref="user_img" :class="[sidebar.opened?'img_show':'img_hide']" >
          <br>
          <div class="user_name" :class="[sidebar.opened?'f_14':'f_12']">admin</div>
        </div>
        <sidebar-item v-for="route in routes" :key="route.path" :item="route" :base-path="route.path" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Logo from './Logo'
import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.scss'
import{getToken} from  '@/utils/auth.js'
export default {
  data(){
    return{
    }
  },
  components: { SidebarItem, Logo },
  computed: {
    ...mapGetters([
      'sidebar'
    ]),
    routes() {
      return this.$router.options.routes
    },
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo
    },
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  },
  mounted(){
    console.log(getToken('vue_admin_template_token'))
  },
  created(){

  }
}
</script>

<style scoped>
.img_show{
  width:90px;
  height:90px;
  border-radius:50%;
  border:1px solid white;
}
.img_hide{
  width:40px;
  height:40px;
  border-radius:50%;
  border:1px solid white;
}
.user_name{
  color:white;
  margin-top:15px;
}
.f_14{
  font-size: 14px;
}
.f_12{
  font-size: 12px;
}
</style>

