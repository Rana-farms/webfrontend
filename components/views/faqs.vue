<template>
  <div class="faqs p-2 md:px-8 py-10">
    <span class="faqs__title">Frequently Asked Questions</span>

    <div
      class="faqs__question"
      v-for="(question, index) in questions"
      :key="index"
    >
      <div
        class="flex items-center justify-between"
        @click="active == index ? (active = -1) : (active = index)"
      >
        <div class="title flex-1">
          {{ question.title }}
        </div>
        <v-btn v-if="active !== index" color="#908DAA" icon
          ><v-icon>mdi-plus</v-icon></v-btn
        >
        <v-btn v-else color="#908DAA" icon><v-icon>mdi-minus</v-icon></v-btn>
      </div>
      <transition name="animate-down">
        <div class="answer" v-if="active == index">
          {{ question.answer }}
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: -1,

      questions: [
        {
          title: 'Sed ut perspiciatis unde omnis iste natus error sit',
          answer: `sdjlksk dvududud dudud perspiciatis unde omnis iste natus error sit dudu dd perspiciatis unde omnis iste natus error sit`,
        },
        {
          title: 'Sed ut perspiciatis unde omnis iste natus error sit',
          answer: `sdjlksk dvududud dudud perspiciatis unde omnis iste natus error sit dudu dd perspiciatis unde omnis iste natus error sit`,
        },
        {
          title: 'Sed ut perspiciatis unde omnis iste natus error sit',
          answer: `sdjlksk dvududud dudud perspiciatis unde omnis iste natus error sit dudu dd perspiciatis unde omnis iste natus error sit`,
        },
        {
          title: 'Sed ut perspiciatis unde omnis iste natus error sit',
          answer: `sdjlksk dvududud dudud perspiciatis unde omnis iste natus error sit dudu dd perspiciatis unde omnis iste natus error sit`,
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
@import '~assets/scss/breakpoints.scss';

.faqs {
  background: #f5f5f5;
  padding: 0 15px;

  &__title {
    display: block;
    color: #211a55;
    font-weight: bold;
    font-size: 28px;
    line-height: 36px;
    text-align: center;
    margin-bottom: 30px;

    @include media-breakpoint-up(md) {
      font-size: 48px;

      margin-bottom: 60px;
      margin-top: 30px;
    }
  }

  &__question {
    border-radius: 15px;
    max-width: 920px;
    background-color: #fff;
    padding: 12px;
    cursor: pointer;
    display: block;
    margin: 30px auto;

    .title {
      font-weight: 400;
      color: #4d4877;
    }

    .answer {
      color: #000;
      margin-top: 12px;
      padding: 12px;
      border-radius: 0px 0px 15px 15px;

      box-shadow: 0px -1px 2px rgba(0, 0, 0, 0.1);
    }
  }
}

.animate-down {
  &enter {
    transform: translateY(-10px);
    opacity: 0;
  }
  &enter-active,
  &leave-active {
    transition: all 0.3s ease-out;
  }

  &leave-to {
    opacity: 0;
    transform: translateY(-10px);
  }
}
</style>
