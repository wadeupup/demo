<template>
  <div v-over-hide="height" class="table-temp_thumbnail_container">
    <div class="table-temp_thumbnail" :style="{'max-height':show?'9999999px':(height+'px'),'height':show ? (computedHeight+'px'):(height+'px')}">
      <div style="100%">
        <div v-if="text" style="word-break:break-all;white-space:normal" v-text="computedHtml(text)"></div>
        <div v-else>
          <slot/>
        </div>
      </div>
      <div :class="{'table-temp_thumbnail_more': type === 'site'? false:true,'table-temp_thumbnail_add': type === 'site'? true:false}" @click="handleMore">
        <cut-icon :name="show ? 'up-doubleline': 'down-doubleline'">
      </div>
    </div>
  </div>
</template>
<script>
const isString = (val) => typeof val === "string";
export default {
  directives: {
    "over-hide": {
      inserted: function (e, binding, vnode) {
        vnode.context.computedHeight =
          e.firstChild.firstChild.firstChild.offsetHeight;
        if (e.firstChild.firstChild.firstChild.offsetHeight < binding.value) {
          if (e.className.indexOf("hidden") === -1) e.className += "hidden";
        }
      },
    },
  },
  name: "Thumbnail",
  props: {
    height: {
      type: Number,
      default: 80,
    },
    text: {
      type: string,
      default: "",
    },
    type: {
      type: string,
      default: "",
    },
  },
  data() {
    return {
      show: false,
      computedHeight: 0,
    };
  },
  methods: {
    computedHtml(html) {
      console.log(111)
      if (isString(html)) {
        return html.replace(/\n/g, "<br/>");
      }
      return "";
    },
    handleMore() {
      this.show = !this.show;
    },
  },
};
</script>
<style lang="postcss" scoped>
.table-temp_thumbnail_more {
  position: absolute;
  z-index: 99;
  bottom: -20px;
  text-align: center;
  left: 50%;
  cursor: pointer;
}
.table-temp_thumbnail_add {
  position: absolute;
  z-index: 99;
  bottom: -20px;
  left: 60%;
  cursor: pointer;
}
.table-temp_thumbnail_height {
  overflow: hidden;
}
.table-temp_thumbnail {
  word-break: break-all;
  overflow: hidden;
  margin-bottom: 15px;
  transition: all 0.5s ease;
}
.table-temp_thumbnail_container {
  position: relative;
  &.hidden {
    .table-temp_thumbnail_more {
      display: none;
    }
    .table-temp_thumbnail_add {
      display: none;
    }
  }
}
</style>