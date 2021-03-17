<template>
  <div class="hello">
    <div class="hello-btn">1111</div>
    <el-button @click="handleClickDrag">dianji</el-button>
    <!-- <div style="width: 100px; height: 100px; border: 1px solid black"></div> -->
    <div
      style="
        overflow: auto;
        position: relative;
        border-top: 1px solid rgb(206, 206, 206);
        border-left: 1px solid rgb(206, 206, 206);
        border-right: 1px solid rgb(206, 206, 206);
      "
      id="right-gantt-table-tasks"
    >
      <div
        class="left-gantt-columns"
        id="left-gantt-columns"
        style="position: absolute; top: 8px"
      >
        <div class="left-gantt-columns-name">任务名称</div>
        <div class="left-gantt-columns-person">负责人</div>
        <div class="left-gantt-columns-start">开始时间</div>
        <div class="left-gantt-columns-duration">持续时间</div>
        <div class="left-gantt-columns-add" @click="addTask">
          <i class="el-icon-plus"></i>
        </div>
      </div>
      <div
        class="right-gantt-table"
        id="right-gantt-table-refs"
        style="margin-left: 400px; width: calc(100% - 400px); overflow: auto"
      >
        <div class="right-gantt-content">
          <div class="right-gantt-content-year">{{ localYear }}年</div>
          <div class="right-gantt-content-date" style="display: flex">
            <template>
              <div
                v-for="(item, index) of showDays"
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
            </template>
            <template v-if="finallyDays">
              <div
                v-for="(item, index) of finallyDays - showDays - currentDay + 1"
                :key="`${index}-we`"
                style="
                  width: 60px;
                  border-right: 1px solid #cecece;
                  text-align: center;
                "
              >
                {{ item + showDays + currentDay - 1 }}
                {{ currentMonth + 1 }} 月
              </div>
            </template>
            <template v-if="showAnotherDays">
              <div
                v-for="(item, index) of days"
                :key="`${index}-we`"
                style="
                  width: 60px;
                  border-right: 1px solid #cecece;
                  text-align: center;
                "
              >
                {{ item }}
                {{ currentMonth + 2 }} 月
              </div>
            </template>
            <template v-if="anotherDays">
              <div
                v-for="(item, index) of anotherDays"
                :key="`${index}-we-${currentMonth}`"
                style="
                  width: 60px;
                  border-right: 1px solid #cecece;
                  text-align: center;
                "
              >
                {{ item }}
                {{ currentMonth + 2 }} 月
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
    <div class="gantt-table" id="gantt-tables">
      <div
        class="left-gantt-table"
        style="position: absolute; background: #fefeff; z-index: 99"
      >
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
      <div
        style="
          margin-left: 400px;
          position: relative;
          width: calc(100% - 400px);
          overflow-x: auto;
          overflow-y: hidden;
        "
        id="timi"
      >
        <div class="right-gantt-square">
          <div
            style="display: flex"
            v-for="(i, index) of progressStyle.length"
            :key="index"
          >
            <div
              v-for="(item, index) of showDays"
              :key="index"
              style="
                width: 60px;
                height: 38px;
                border-right: 1px solid #cecece;
                text-align: center;
                border-bottom: 1px solid #cecece;
                flex-shrink: 0;
              "
            ></div>
            <template v-if="finallyDays">
              <div
                v-for="(item, index) of finallyDays - showDays - currentDay + 1"
                :key="`${index}-we`"
                style="
                  width: 60px;
                  height: 38px;
                  border-right: 1px solid #cecece;
                  text-align: center;
                  border-bottom: 1px solid #cecece;
                  flex-shrink: 0;
                "
              ></div>
            </template>
            <template v-if="showAnotherDays">
              <div
                v-for="(item, index) of days"
                :key="`${index}-we`"
                style="
                  width: 60px;
                  height: 38px;
                  border-right: 1px solid #cecece;
                  text-align: center;
                  border-bottom: 1px solid #cecece;
                  flex-shrink: 0;
                "
              ></div>
            </template>
            <template v-if="anotherDays">
              <div
                v-for="(item, index) of anotherDays"
                :key="`${index}-wer-${currentMonth}`"
                style="
                  width: 60px;
                  height: 38px;
                  border-right: 1px solid #cecece;
                  text-align: center;
                  border-bottom: 1px solid #cecece;
                  flex-shrink: 0;
                "
              ></div>
            </template>
          </div>
        </div>
        <div
          v-for="(item, index) of progressStyle"
          class="progress-bar"
          :id="`box${index}`"
          :style="{
            left: progressStyle[index].left + 'px',
            top: progressStyle[index].top * index + 0 + 'px',
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
              ></div>
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
      :before-close="handletest"
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
          <div style="display: flex">
            <el-input v-model="taskForm.progress"></el-input>
            <div>%</div>
          </div>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
      </span>
    </el-dialog>
    <div></div>
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
      detailDay: [],
      maxDays: 0,
      detailDays: 0,
      hh: 0,
      days: 0,
      list: [],
      localTime: "",
      left: "",
      top: "",
      addTaskVisible: false,
      newForm: {
        taskName: "",
        taskTime: "",
        duration: "",
        progress: 0,
      },
      progressStyle: [
        // { left: 10, top: 100 },
        // { left: 20, top: 137 },
      ], //任务进度条总长度
      progressBar: [], //目前任务的进展
      pickerOptions: {
        disabledDate: (time) => {
          return time.getTime() < Date.now() - 8.64e7;
        },
      },
      taskForm: {
        taskName: "",
        taskTime: "",
        duration: "",
        progress: 0,
      },
      taskRules: {
        taskTime: [
          { required: true, message: "请输入任务时间", trigger: "blur" },
        ],
        progress: [
          { required: true, message: "请输入任务进展", trigger: "blur" },
          {
            validator: (rule, value, callback) => {
              var reg = /^[0-9]\d*$/;
              var valid = reg.test(value);
              if (valid) {
                if (value < 0) {
                  callback(new Error("请重新输入任务进展！仅支持100以内整数"));
                } else if (value > 100) {
                  callback(new Error("请重新输入任务进展！仅支持100以内整数"));
                } else {
                  callback();
                }
              } else {
                callback(new Error("请重新输入任务进展！仅支持100以内整数"));
              }
            },
          },
        ],
      },
      taskTable: [],
      finallyDays: 0,
      anotherDays: 0,
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
        const days = Math.floor(minutes / 24);
        const hour = minutes - days * 24;
        console.log("===34344", minutes, day);
        // const firstDay = Math.floor(minutes / 60);//小时
        // const confirmMinutes = minutes - firstDay * 60;//分钟
        // const lastDay = Math.floor(confirmMinutes / 24);
        // const hour = confirmMinutes - lastDay * 24;
        const data = [days, hour, seconds, lastSecond];
        const title = ["天", "小时", "分钟", "秒"];
        let realData = "";
        data.forEach((item, index) => {
          if (item === 0) {
            realData += "";
          } else {
            realData += item + title[index];
          }
        });
        console.log("=====>realData", data, realData);
        return realData;
      } else {
        return 0;
      }
    },
    showDays() {
      //假如本月剩余天数超过15tian
      if (this.monthDays - this.currentDay + 1 >= 15) {
        const myDate = new Date();
        const myYear = myDate.getFullYear();
        const myMonth = myDate.getMonth() + 1;
        const myDay = myDate.getDate();
        const monthDay = new Date(
          `${myYear}-${myMonth}-${this.monthDays}`
        ).getTime();
        //如果任务截止日期最后一天在15天内，返回15天。假如超过15天，那么showdays暂时返回15天，多出的
        //天数计算通过下面的showAnotherDays和days
        console.log("===", this.taskForm.taskTime[1]);
        console.log(myDay, monthDay);
        if (this.taskForm.taskTime[1]) {
          console.log("xhuosnoscno====>");
          const a = this.taskForm.taskTime[1];
          if (a.getTime() < monthDay) {
            console.log("12w3e34");
            return 15;
          } else {
            console.log("sssss");
            const anotherTime =
              this.taskForm.taskTime[1].getTime() -
              new Date(`${myYear}-${myMonth}-${myDay}`).getTime();
            const anotherDay = Math.floor(anotherTime / (1000 * 3600 * 24)) + 1;
            const lastDay = anotherDay > 15 ? 15 : anotherDay;
            console.log(lastDay, "=======>");
            return lastDay;
          }
        } else {
          return 15;
        }
      } else {
        return this.monthDays - this.currentDay + 1;
      }
    },
    showAnotherDays() {
      //本月不够15天。延续到下个月中
      if (15 - (this.monthDays - this.currentDay + 1) > 0) {
        const selectionTime =
          this.taskForm.taskTime[1] && this.taskForm.taskTime[1].getTime();
        const dateTime = new Date(selectionTime);
        const date = dateTime.getDate();
        // const list = date
        if (date > 15 - (this.monthDays - this.currentDay + 1)) {
          return date;
        } else {
          return 15 - (this.monthDays - this.currentDay + 1);
        }
      } else {
        return 0;
        // if(this.taskForm.taskTime[1]&&this.taskForm.taskTime[1]){
        //   const et = new Date(this.taskForm.taskTime[1]).getTime();
        //    var regularDate = myDate.split("/").join("-");
        //     var regularTime = new Date(regularDate).getTime();
        //     var leftDay = (et - regularTime) / (1000 * 3600 * 24);
        //     return leftDay-15
        // }else{
        //   return 10
        // }
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
    this.days = this.showAnotherDays;
    window.addEventListener("scroll", this.handleScroll, true);
    // var myDate = new Date();
    // console.log("ee", myDate.getFullYear());
    // this.moveBox(
    //   document.getElementById("box"),
    //   document.getElementById("drag")
    // );
  },
  watch: {
    "detailDay.length"(old, newValue) {
      var max = this.detailDay[0];
      var len = this.detailDay.length;
      for (let i = 1; i < len; i++) {
        if (this.detailDay[i] > max) {
          max = this.detailDay[i];
        }
      }
      this.hh = max;
      console.log("4544", this.hh, old, newValue);
    },
    hh(old, newValue) {
      if (old > 15) {
        const myDate = new Date().getDate();
        const day = myDate + old - 1;
        this.finallyDays = day > this.monthDays ? this.monthDays : day;
        this.anotherDays = day > this.monthDays ? day - this.monthDays : 0;
      }
      console.log(newValue);
    },

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
    showAnotherDays(old, newValue) {
      const day = old > newValue ? old : newValue;
      this.list.push(day);
      this.list.sort();
      this.days = this.list[this.list.length - 1];
    },
  },

  methods: {
    handleScroll() {
      const topTwo = document.getElementById("right-gantt-table-refs")
        .scrollLeft;
      const top = document.getElementById("timi").scrollLeft;
      if (top !== 0) {
        //   document.getElementById("right-gantt-table-refs").scrollLeft = 0;

        document.getElementById("right-gantt-table-refs").scrollLeft = top;
      }

      // document.getElementById("left-gantt-columns").style.top = 12;
      console.log(
        "111",
        top,
        topTwo,
        document.getElementById("right-gantt-table-refs").scrollLeft
      );
    },
    handleProgress(index) {
      console.log("111=====", this.progressStyle);
      var maxWidth = this.progressStyle[index].width;
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
          // console.log("2222", this.progressStyle, this.progressStyle);

          console.log("45555", maxWidth);
          if (val < 0) {
            that.style.left = 0;
          } else if (val > maxWidth) {
            that.style.left = maxWidth + "px";
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
        // 进度条能拖动的最大距离
        const details = this.hh > 15 ? this.hh : 15;
        const numberFar = (details + 1) * 61 - B.offsetWidth;
        //console.log(number);
        x = x > numberFar ? numberFar : x;
        // const height = 20 * index
        this.progressStyle[index].left = x;

        // this.left = x;
        // this.top = y;
        // 进度条往右拖拽时带动整个gantt-tables拖动
        const far = Math.floor((x + 60) / 320);
        // if (x > 195) {
        document.getElementById("timi").scrollLeft = far * 300;
        document.getElementById("right-gantt-table-refs").scrollLeft =
          far * 300;
        //     195 * (x / 195) + 100;
        // }

        this.$forceUpdate();
        // console.log("222");
        console.log(x);
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
          const form = JSON.parse(JSON.stringify(this.taskForm));
          this.taskTable.push(form);
          console.log(
            "11111122",
            this.taskForm.duration,
            this.taskForm.taskTime
          );
          //获取任务时长
          const st = new Date(this.taskForm.taskTime[0]).getTime();
          const et = new Date(this.taskForm.taskTime[1]).getTime();
          // console.log(this.taskForm);
          const day = et - st;
          const time = day / (1000 * 3600 * 24);
          // 获取任务的left
          // 获取当前日期仅限日期不包含时间
          const myDate = new Date().toLocaleDateString();
          // 规范当前的日期为--模式
          var regularDate = myDate.split("/").join("-");
          var regularTime = new Date(regularDate).getTime();
          var leftDay = (st - regularTime) / (1000 * 3600 * 24);
          var rightDay = Math.ceil((et - regularTime) / (1000 * 3600 * 24));
          this.maxDays = leftDay;
          this.progressStyle.push({
            left: leftDay * 61,
            top: 39,
            width: time * 61,
          });
          this.detailDay.push(rightDay);
          console.log("rightday", this.detailDay, rightDay);
          // this.detailDay.sort();
          console.log("====shenmguia", this.detailDay.length);
          // this.detailDays =
          //   this.detailDay.length - 1 > 0
          //     ? this.detailDay[this.detailDay.length - 1]
          //     : 0;
          console.log("weee", this.detailDays);
          var progressWidth = (time * 60 * this.taskForm.progress) / 100;
          this.progressBar.push({ left: progressWidth });
          // document.getElementById("timi").scrollLeft = leftDay * 61;
          this.$nextTick(() => {
            document.getElementById("timi").scrollLeft = leftDay * 61;
          });

          console.log(
            "tijiaoshangqu++++++++++",
            leftDay * 61,
            document.getElementById("timi").scrollLeft
          );
          console.log(
            "222",
            document.getElementById("timi").scrollLeft,
            leftDay * 61
          );
          this.$refs.taskForm.resetFields();
          this.$refs.taskForm.clearValidate();
          // this.detailDays = this.detailDay.join(",");
          // this.taskForm = Object.assign({}, this.newForm);
        }
      });
    },
    handletest(done) {
      done();
      console.log("2222", done);
    },
    handleClose() {
      this.addTaskVisible = false;
      this.$refs.taskForm.resetFields();
      this.$refs.taskForm.clearValidate();
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="postcss">
.hello {
  width: 80%;
  .hello-btn {
    color: red;
  }
}

.gantt-table {
  height: 240px;
  overflow: auto;
  border: 1px solid #cecece;
  text-align: left;
  position: relative;
  /* display: flex; */
  /* word-break: break-all; */
}
.left-gantt-table {
  width: 400px;
  /* padding: 8px; */
  /* height: 224px; */
  border-right: 1px solid #cecece;
  font-size: 14px;
  /* border-bottom: 1px solid #cecece; */
}
.left-gantt-columns {
  display: flex;
  color: #a6a6a6;
  border-bottom: 1px solid #ebebeb;
  height: 34px;
  line-height: 34px;
  border-right: 1px solid #ebebeb;
}
.input-class {
  width: 120px;
}
.left-gantt-columns-name {
  width: 90px;
  text-align: center;
}
.left-gantt-columns-person {
  width: 70px;
  text-align: center;
}
.el-date-editor {
  width: 100%;
}
.left-gantt-columns-duration {
  width: 124px;
  text-align: center;
}
.left-gantt-content-item {
  display: flex;
  border-bottom: 1px solid #ebebeb;
  padding: 8px 0px;
  height: 22px;
}
.left-gantt-columns-start {
  width: 100px;
  text-align: center;
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
  height: 40px;
  /* background: #d5cdda; */
  /* border: 2px solid #ccc; */
  top: 150px;
  left: 400px;
  margin: 0;
  display: flex;
}
.progress-bar-content {
  height: 38px;
  cursor: move;
  background: #b7bfce;
  border-bottom: 1px solid #ccc;
  padding: 0 10px;
  flex-basis: 99%;
}
.bar {
  width: 2px;
  height: 38px;
  background-color: #443d3d;
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
::-webkit-scrollbar {
  width: 2px;
  height: 2px;
}
::-webkit-scrollbar-track {
  border-radius: 2px;
}
::-webkit-scrollbar-thumb {
  border-radius: 2px;
  background: rgba(0, 0, 0, 0.1);
}
</style>
