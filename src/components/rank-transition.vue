<template>
  <div :class="[computeClass, 'rank-wrapper']">
    <h5 class="rank-title">{{ title }}</h5>
    <div
      ref="list"
      :style="{ height: calHeight ? calHeight + 'px' : '' }"
      class="rank-list-wrapper"
    >
      <template v-for="(rank, i) in rankList"> 
        <div v-if="show ?true :i<5" :key="i" :class="{'is-hover':rank.isHover,'rank-item':true}">
         <div class="parent-col">
           <!-- 展开的按钮 -->
           <svg v-if="expanded" :class="{'is-expand':rank_isClicked,'is-hover':rank.isHover,'expand-icon':true}"
           @click="mouseclick(rank,i)"
           @mouseenter="mouseenter(rank)"
           @mouseleave="mouseleave(rank)">
           </svg>
           <span
           v-if="showIndex"
           class="rank"
           :style="{ backgroundColor:computeColor(i+1)}">
          {{i+1}}
           </span>
           <!-- 排行榜的排名-->
           <img v-if="showIcon" :src="`data;image.jpeg;base64,${rank.icon}`" width="17"/>
           <span class="rank-label">{{rank.name}}</span>
           <span class="rank-value">{{rank.formatNum}}</span>
         </div>
         <div v-if="rank._isClicked" class="child-item">
           <div v-for="(rankChild,j) in rank.children" class="children-rank-item rank-item" :key="'child'+j">
           <span class="rank-label">{{rankChild.name}}</span>
           <span class="rank-value">{{rankChild.formatNum}}</span>
           </div>
         </div>
        </div>
      </template>
    </div>
    <div v-if="collapse">
      <div v-if="showMore" class="thumbnail_more" @click="handleMore">
        <div>111</div>
         <!-- <el-icon :name="show ? 'angle-double-up': 'angle-double-down'"/>  -->
         <!-- <div :name="show?'angle-double-up':'angle-double-down' ></div> -->
      </div>
    </div>
</div>
</template>
<script>
// import { set } from "vue/types/umd";
const type = (data) => {
  return Object.prototype.toString.call(data).slice(8, -1);
};
let timer = null;
export default {
  name: "rank-transition",
  props: {
    collapse: {
      type: [Boolean],
      default: true,
    },
    showIndex: {
      type: [Boolean],
      default: true,
    },
    showIcon: {
      type: [Boolean],
      default: false,
    },
    expanded: {
      type: [Boolean],
      default: false,
    },
    title: {
      type: [String],
      default: "标题",
    },
    customClass: {
      type: [Function, String],
      default: "",
    },
  },
  data() {
    return {
      showMore: false,
      show: false,
      rankList: [],
      calHeight: 0,
      list:[{name:'1',value:3},{name:'2',value:3},{name:'3',value:3},{name:'4',value:3},{name:'5',value:3},{name:'6',value:3},{name:'7',value:3},{name:'8',value:3}]
    };
  },
  computed: {
    computeClass() {
      return type(this.customClass) === "Function"
        ? this.customClass()
        : this.customClass;
    },
  },
  // watch: {
  //   list: {
  //     handler(n) {
  //       const arr = [];
  //       n.forEach((item) => {
  //         arr.push({
  //           ...item,
  //           _isHover: false,
  //           _isClicked: false,
  //         });
  //       });
  //       this.rankList = arr.map((item) => {
  //         return {
  //           name: item.name,
  //           percent: item.percent,
  //           icon: item.icon,
  //           _isHover: false,
  //           _isClicked: false,
  //           formatNum: this.thousand(item.num),
  //         };
  //       });
  //       this.showMore = arr.length > 5;
  //     },
  //   },
  // },
  mounted(){

        this.rankList = this.list.map((item) => {
          return {
            name: item.name,
            percent: item.percent,
            icon: item.icon,
            isHover: false,
            isClicked: false,
            // formatNum: this.thousand(item.num),
          };
        });
        console.log(this.rankList,'===this.rankList')
        this.showMore = this.list.length > 5;
  },
  methods: {
    handleMore() {
      this.show = !this.show;
      const beforeHeight = this.$refs.list.offsetHeight;
      this.calHeight = 0;
      this.$nextTick(() => {
        clearTimeout(timer);
        let needOrigin = false;
        const nowHeight = this.$refs.list.offsetHeight;
        this.calHeight=beforeHeight
        if (!this.show) {
          this.show = !this.show;
          needOrigin = true;
        }
        setTimeout(() => {
          this.calHeight = nowHeight;
          timer = setTimeout(() => {
            if (needOrigin) {
              this.show = !this.show;
              needOrigin = false;
            }
            clearTimeout(timer);
          }, 600);
        }, 100);
      });
    },
    mouseclick(rank, i) {
      this.calHeight = 0;
      rank.isClicked = !rank.isClicked;
      this.rankList = [...this.rankList];
      this.$emit("expand", rank, i);
    },
    mouseleave(rank) {
      rank.isHover = false;
    },
    mouseenter(rank) {
      rank.isHover = true;
    },
    computeColor(i) {
      const colorMap = {
        1: "rgba(203,45,42,1)",
        2: "rgba(233,105,14,1)",
        3: "rgba(251,187,100,1)",
      };
      return colorMap[i] || "rgba(0,145,255,1)";
    },
    thousand(num) {
      var str = num.toString();
      var rg =
        str.indexOf(".") > -1 ? /(\d)(?=(\d{3})+\.)/g : /(\d)(?=(?:\d{3})+$)/g;
      return str.replace(rg, "$1,");
    },
  },
};
</script>
<style lang='postcss' scoped>
.rank-wrapper {
  position: relative;
  .rank-list-wrapper {
    transition: all 0.5s ease;
    overflow: hidden;
  }
}
.thumbnail_more {
  position: absolute;
  z-index: 99;
  bottom: -6px;
  text-align: center;
  left: 50%;
  cursor: pointer;
}
.rank-item {
  line-height: 22px;
  padding: 8px 16px;
  border-radius: 4px;
  .parent-col {
    padding: 0px 0px;
    svg,
    img {
      vertical-align: text-bottom;
    }
  }
}
.rank-title {
  padding: 8px 16px;
}
.rank {
  display: inline-block;
  width: 16px;
  height: 16px;
  line-height: 16px;
  color: #fff;
  text-align: center;
}
.rank-label {
}
.rank-value {
  float: right;
}
.expand-icon {
  margin-top: 6px;
  margin-left: 6px;
  float: right;
  transition-duration: 0.5s;
}
.child-item {
  color: #8090a0;
}
.is-expand {
  transform: rotate(-90deg);
}
.is-hover {
  path {
    fill: #1a9cff;
  }
}
</style>