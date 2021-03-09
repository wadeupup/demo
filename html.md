<template>
  <div class="hello">
    <el-button @click="handleClickDrag">dianji</el-button>
    <!-- <div style="width: 100px; height: 100px; border: 1px solid black"></div> -->
    <div class="gantt-table" id="gantt-tables">
      <div
        class="left-gantt-table"
        style="position: fixed; background: #fefeff; z-index: 99"
      >
        <div class="left-gantt-columns">
          <div class="left-gantt-columns-name">任务名称</div>
          <div class="left-gantt-columns-person">负责人</div>
          <div class="left-gantt-columns-start">开始时间</div>
          <div class="left-gantt-columns-duration">持续时间</div>
          <div class="left-gantt-columns-add" @click="addTask">
            <i class="el-icon-plus"></i>
          </div>
        </div>
        <div class="left-gantt-content">
          <div
            class="left-gantt-content-item"
            v-for="(item, index) of taskTable"
            :key="index"
          >
            <div class="left-gantt-columns-name">{{ item.taskName }}</div>
            <div class="left-gantt-columns-person">负责人</div>
            <div class="left-gantt-columns-start">
              {{ dateFormat(item.taskTime[0]) }}
            </div>
            <div class="left-gantt-columns-duration">{{ item.duration }}</div>
          </div>
        </div>
      </div>
      <div style="margin-left: 420px; position: relative">
        <div class="right-gantt-table">
          <div class="right-gantt-content">
            <div class="right-gantt-content-year">{{ localYear }}年</div>
            <div class="right-gantt-content-date" style="display: flex">
              <div
                v-for="(item, index) of monthDays - currentDay + 1"
                :key="index"
                style="
                  width: 60px;
                  border-right: 1px solid #cecece;
                  text-align: center;
                "
              >
                {{ item + currentDay - 1 }}
                {{ currentMonth + 1 }} 月
              </div>
            </div>
          </div>

          <!-- <div
          class="progress-bar"
          id="box1"
          :style="{ left: left + 'px', top: 100 + 'px' }"
          @click="moveBox(1)"
        >
          <div id="drag1" class="progress-bar-content">拖动区域</div>
          被拖动的整个div
        </div>
        <div
          id="box2"
          class="progress-bar"
          :style="{ left: left + 'px', top: 24 + 'px' }"
        >
          <div id="drag2" class="progress-bar-content" @click="moveBox(2)">
            拖动区域
          </div>
          被拖动的整个div
        </div> -->
        </div>
        <div class="right-gantt-square">
          <div
            style="display: flex"
            v-for="(i, index) of progressStyle.length"
            :key="index"
          >
            <div
              v-for="(item, index) of monthDays - currentDay + 1"
              :key="index"
              style="
                width: 60px;
                height: 35px;
                border-right: 1px solid #cecece;
                text-align: center;
                border-bottom: 1px solid #cecece;
                flex-shrink: 0;
              "
            ></div>
          </div>
        </div>
        <div
          v-for="(item, index) of progressStyle"
          class="progress-bar"
          :id="`box${index}`"
          :style="{
            left: progressStyle[index].left + 'px',
            top: progressStyle[index].top * (index + 1) + 'px',
            width: progressStyle[index].width + 'px',
          }"
          @click="moveBox(index)"
          :key="index"
        >
          <div style="position: relative; display: flex; width: 100%">
            <div
              :id="`drag${index}`"
              class="progress-bar-content"
              style="position: relative"
            >
              <div
                :id="`dragBar${index}`"
                class="bar"
                @click="handleProgress(index)"
                :style="{ left: progressBar[index].left + 'px' }"
              >
                1
              </div>
              <div
                :id="`dragMask${index}`"
                class="mask"
                :style="{ width: progressBar[index].left + 'px' }"
              ></div>
            </div>
            <div
              :id="`right${index}`"
              class="progress-bar-content-right"
              @click="dragBox(index)"
            ></div>
          </div>
        </div>
      </div>
    </div>
    <el-dialog
      title="新建任务"
      :visible.sync="addTaskVisible"
      width="50%"
      :before-close="handleClose"
    >
      <el-form
        :model="taskForm"
        :rules="taskRules"
        ref="taskForm"
        label-width="100px"
      >
        <el-form-item label="任务名称" prop="taskName">
          <el-input
            v-model="taskForm.taskName"
            placeholder="请输入任务名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="任务时间" prop="taskTime">
          <el-date-picker
            style="width: 100%"
            v-model="taskForm.taskTime"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="任务时长" prop="duration">
          <el-input v-model="taskForm.duration" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="任务进度" prop="progress">
          <el-input v-model="taskForm.progress"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script scoped>
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  data() {
    return {
      localTime: "",
      left: "",
      top: "",
      addTaskVisible: false,
      newForm: {
        taskName: "",
        taskTime: "",
        duration: "",
        progress: "",
      },
      progressStyle: [
        // { left: 0, top: 100 },
        // { left: 0, top: 137 },
      ],
      progressBar: [],
      pickerOptions: {
        disabledDate: (time) => {
          return time.getTime() < Date.now() - 8.64e7;
        },
      },
      taskForm: {
        taskName: "",
        taskTime: "",
        duration: "",
        progress: "",
      },
      taskRules: {
        taskTime: [
          { required: true, message: "请输入任务时间", trigger: "blur" },
        ],
      },
      taskTable: [],
    };
  },
  computed: {
    localYear() {
      var myDate = new Date();
      return myDate.getFullYear();
    },
    duration() {
      if (this.taskForm.taskTime && this.taskForm.taskTime.length === 2) {
        const st = new Date(this.taskForm.taskTime[0]).getTime();
        const et = new Date(this.taskForm.taskTime[1]).getTime();
        // console.log(this.taskForm);
        const day = et - st;
        const time = day / (1000 * 60);
        const standardTime = Math.floor(time);
        const firstTime = day - standardTime * 60 * 1000;
        const lastSecond = firstTime / 1000;
        const firstMinutes = standardTime / 60;
        const minutes = Math.floor(firstMinutes);
        const seconds = standardTime - minutes * 60;
        const firstDay = Math.floor(minutes / 60);
        const confirmMinutes = minutes - firstDay * 60;
        const lastDay = Math.floor(confirmMinutes / 24);
        const hour = confirmMinutes - lastDay * 24;
        const data = [lastDay, hour, seconds, lastSecond];
        const title = ["天", "小时", "分钟", "秒"];
        let realData = "";
        data.forEach((item, index) => {
          if (item === 0) {
            realData += "";
          } else {
            realData += item + title[index];
          }
        });
        return realData;
      } else {
        return 0;
      }
    },
    currentMonth() {
      var myDate = new Date();
      return myDate.getMonth();
    },
    currentDay() {
      var myDate = new Date();
      return myDate.getDate();
    },
    monthDays() {
      var myDate = new Date();
      var year = myDate.getFullYear();
      var flag;
      if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
        flag = true;
      } else {
        flag = false;
      }
      var month = myDate.getMonth() + 1;

      const bigMonth = [1, 3, 5, 7, 8, 10, 12];
      // console.log("1223333", flag, month, bigMonth.includes(month));
      if (flag) {
        if (bigMonth.includes(month)) {
          return 31;
        } else if (month === 2) {
          return 28;
        } else {
          return 30;
        }
      } else {
        if (bigMonth.includes(month)) {
          return 31;
        } else if (month === 2) {
          return 28;
        } else {
          return 30;
        }
      }
    },
  },
  mounted() {
    this.taskForm.duration = this.duration;
    // var myDate = new Date();
    // console.log("ee", myDate.getFullYear());
    // this.moveBox(
    //   document.getElementById("box"),
    //   document.getElementById("drag")
    // );
  },
  watch: {
    duration(newValue) {
      console.log("eeeee");
      this.taskForm.duration = newValue;
    },
    "taskForm.duration"(newValue) {
      // console.log(this.taskForm.taskTime[1]);
      console.log(newValue);
      // const time = newValue * (1000 * 3600 * 24);
      // this.taskForm.taskTime[0].getTime();
      // const newDate = this.taskForm.taskTime[0].getTime() + time;
      // console.log("wwww", new Date(newDate));
    },
  },
  methods: {
    handleProgress(index) {
      console.log("111=====");
      console.log(index);
      var dom = document.getElementById("drag" + index);
      console.log("dom====", dom);
      var bar = dom.children[0];
      var mask = dom.children[1];
      bar.onmousedown = function (even) {
        var event = even || window.event;
        var leftVal = event.clientX - this.offsetLeft;
        console.log("eeee====", even, this, this.offsetLeft, leftVal);
        // 拖动放到down的里面
        var that = this;
        document.onmousemove = function (e) {
          var event1 = e || window.event;
          that.style.left = event1.clientX - leftVal + "px";
          // 限制条件
          var val = parseInt(that.style.left);
          if (val < 0) {
            that.style.left = 0;
          } else if (val > 390) {
            that.style.left = "390px";
          }
          // 移动的距离为遮罩的宽度
          mask.style.width = that.style.left;
          // 显示百分比
          // demo.innerHTML =
          //   "移动了:" + parseInt((parseInt(that.style.left) / 390) * 100) + "%";
          // 清除拖动 --- 防止鼠标已经弹起时还在拖动
          window.getSelection
            ? window.getSelection().removeAllRanges()
            : document.selection.empty();
        };
        // 鼠标抬起停止拖动
        document.onmouseup = function () {
          document.onmousemove = null;
        };
      };
      // console.log("eeee");
      // console.log(bar, mask);
    },
    handleClickDrag() {
      document.getElementById("gantt-tables").scrollLeft += 10;
    },
    dragBox(index) {
      const widthText = document.getElementById("right" + index);
      const B = document.getElementById("box" + index);
      var disX = 0; //鼠标按下时光标的X值
      var disW = 0; //拖拽前div的宽
      widthText.onmousedown = function (event) {
        var ev = event || window.event;
        disX = ev.clientX;
        disW = B.offsetWidth;
        document.onmousemove = function (e) {
          var ev1 = e || window.event;
          var W = ev1.clientX - disX + disW;
          if (W < 20) {
            W = 20;
          }
          B.style.width = W + "px";
        };
        document.onmouseup = function () {
          document.onmousemove = null;
          document.onmouseup = null;
        };
      };
    },
    moveBox(index) {
      const B = document.getElementById("box" + index);
      const BT = document.getElementById("drag" + index);

      var bDrag = false;
      var _x, _y;
      // console.log(B.offsetLeft);
      BT.onmousedown = (event) => {
        var e = event || window.event;
        bDrag = true;
        _x = e.pageX - B.offsetLeft;
        _y = e.pageY - B.offsetTop;
        return false;
      };
      document.onmousemove = (event) => {
        // console.log(111, B);
        if (!bDrag) return false;
        var e = event || window.event;
        var x = e.pageX - _x;
        var y = e.pageY - _y;
        var maxL = document.offsetWidth - B.offsetWidth;
        var maxT = document.offsetHeight - B.offsetHeight;
        x = x < 0 ? 0 : x;
        x = x > maxL ? maxL : x;
        y = y < 0 ? 0 : y;
        y = y > maxT ? maxT : y;
        const numberFar =
          (this.monthDays - this.currentDay + 1) * 61 - B.offsetWidth;
        //console.log(number);
        x = x > numberFar ? numberFar : x;
        // const height = 20 * index
        this.progressStyle[index].left = x;

        // this.left = x;
        // this.top = y;
        const far = Math.floor((x + 60) / 320);
        // if (x > 195) {
        document.getElementById("gantt-tables").scrollLeft = far * 300;
        //     195 * (x / 195) + 100;
        // }

        this.$forceUpdate();
        // console.log("222");
        console.log(y);
        return false;
      };
      document.onmouseup = () => {
        bDrag = false;
        return false;
      };
    },
    dateFormat(dateData) {
      if (dateData) {
        var date = new Date(dateData);
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        m = m < 10 ? "0" + m : m;
        var d = date.getDate();
        d = d < 10 ? "0" + d : d;
        const time = y + "-" + m + "-" + d;
        return time;
      } else {
        return 0;
      }
    },
    addTask() {
      this.addTaskVisible = true;
    },
    handleSubmit() {
      this.$refs.taskForm.validate((valid) => {
        if (valid) {
          this.addTaskVisible = false;
          this.taskTable.push(this.taskForm);
          console.log(
            "11111122",
            this.taskForm.duration,
            this.taskForm.taskTime
          );
          const st = new Date(this.taskForm.taskTime[0]).getTime();
          const et = new Date(this.taskForm.taskTime[1]).getTime();
          // console.log(this.taskForm);
          const day = et - st;
          const time = day / (1000 * 3600 * 24);

          this.progressStyle.push({
            left: 0,
            top: 40,
            width: time * 60,
          });
          this.progressBar.push({ left: 30 });
          this.taskForm = Object.assign({}, this.newForm);
        }
      });
    },
    handleClose() {
      this.addTaskVisible = false;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
.hello {
  width: 80%;
}
.gantt-table {
  height: 240px;
  overflow: auto;
  border: 1px solid #cecece;
  text-align: left;
  /* display: flex; */
  /* word-break: break-all; */
}
.left-gantt-table {
  width: 400px;
  padding: 8px;
  height: 224px;
  border-right: 1px solid #cecece;
  font-size: 14px;
  border-bottom: 1px solid #cecece;
}
.left-gantt-columns {
  display: flex;
  color: #a6a6a6;
  border-bottom: 1px solid #ebebeb;
  height: 34px;
  line-height: 34px;
}
.input-class {
  width: 120px;
}
.left-gantt-columns-name {
  width: 90px;
}
.left-gantt-columns-person {
  width: 70px;
}
.el-date-editor {
  width: 100%;
}
.left-gantt-columns-duration {
  width: 124px;
}
.left-gantt-content-item {
  display: flex;
  border-bottom: 1px solid #ebebeb;
  padding: 8px 0px;
}
.left-gantt-columns-start {
  width: 100px;
}
.left-gantt-columns-add:hover {
  color: red;
  cursor: pointer;
}
.el-dialog__title {
  float: left;
}
.right-gantt-table {
  /* flex: 1; */
  display: flex;

  /* padding: 8px; */
}
.right-gantt-content {
  height: 42px;
  border-bottom: 1px solid #ebebeb;
  font-size: 12px;
  color: rgb(150, 147, 147);
}
.right-gantt-content-year {
  height: 16px;
  text-align: center;
  border-bottom: 1px solid #ebebeb;
}
.right-gantt-content-date {
  height: 26px;
  line-height: 26px;
}
.progress-bar {
  position: absolute;
  width: 300px;
  height: 34px;
  background: #d5cdda;
  border: 2px solid #ccc;
  top: 150px;
  left: 400px;
  margin: 0;
  display: flex;
}
.progress-bar-content {
  height: 34px;
  cursor: move;
  background: #724a88;
  border-bottom: 1px solid #ccc;
  padding: 0 10px;
  flex-basis: 99%;
}
.bar {
  width: 10px;
  height: 35px;
  background-color: red;
  position: absolute;
  left: 0;
  cursor: pointer;
}
.mask {
  width: 10px;
  height: 100%;
  background-color: #336699;
  position: absolute;
  left: 0px;
}
.progress-bar-content-right {
  height: 25px;
  width: 1px;
  cursor: e-resize;
}
</style>
