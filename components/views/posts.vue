<<<<<<< HEAD
<template>
  <div class="posts">
    <span class="posts__title">Our latest Posts</span>

    <div class="container flex flex-wrap items-center gap-8 justify-center">
      <div class="container__post" v-for="(post, index) in posts" :key="index">
        <div class="container__post--rating">
          <img
            src="/images/posts/star.svg"
            v-for="star in post.rating"
            :key="star"
            :alt="star"
          />
        </div>
        <span class="container__post--speech">
          {{ post.speech }}
        </span>

        <div class="container__post--poster">
          <img
            class="avatar"
            :src="post.poster.avatar"
            :alt="post.poster.name"
          />
          <div class="flex flex-col gap-0 justify-center">
            <span class="font-semibold text-sm">{{ post.poster.name }}</span>
            <span class="text-gray-300 text-sm" style="color: #c4c4c4">{{
              post.poster.position
            }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      posts: [
        {
          rating: 5,
          speech: `Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.`,
          poster: {
            avatar: '/images/posts/avatar-1.png',
            name: 'Jane Doe',
            position: 'Digital marketer',
          },
        },
        {
          rating: 5,
          speech: `Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.`,
          poster: {
            avatar: '/images/posts/avatar-2.png',
            name: 'Julia Shumway',
            position: 'Sales consultaint',
          },
        },
        {
          rating: 5,
          speech: `Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.`,
          poster: {
            avatar: '/images/posts/avatar-3.png',
            name: 'Samantha Wheeler',
            position: 'Business analyst',
          },
        },
        {
          rating: 5,
          speech: `Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.`,
          poster: {
            avatar: '/images/posts/avatar-4.png',
            name: 'Alexander Perce',
            position: 'CEO bonga',
          },
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
@import '~assets/scss/breakpoints.scss';
.posts {
  margin: 50px auto;
  &__title {
    display: block;
    text-align: center;
    color: #161616;
    font-weight: 600;
    font-size: 25px;

    @include media-breakpoint-up(md) {
      font-size: 48px;
      margin-bottom: 20px;
    }
  }

  .container {
    &__post {
      display: inline-block;
      margin-top: 32px;

      &--rating {
        display: flex;
        width: 100%;

        img {
          margin-right: 10px;
        }
      }

      &--speech {
        margin: 10px 0px;
        display: block;
        max-width: 250px;
        text-align: left;
        font-weight: 18px;
        line-height: 27px;
        font-weight: 400;
        color: #888888;
      }

      &--poster {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 20px;
        .avatar {
          border-radius: 50%;
          height: 45px;
          width: 45px;
          display: block;
          margin-right: 8px;
        }
      }
    }
  }
}
</style>
=======
<template>
  <div class="posts">
    <span class="posts__title">Our latest Posts</span>

    <div class="container flex flex-wrap items-center gap-8 justify-center">
      <div class="container__post" v-for="(post, index) in posts" :key="index">
        <div class="container__post--rating">
          <img
            src="/images/posts/star.svg"
            v-for="star in post.rating"
            :key="star"
            :alt="star"
          />
        </div>
        <span class="container__post--speech">
          {{ post.speech }}
        </span>

        <div class="container__post--poster">
          <img
            class="avatar"
            :src="post.poster.avatar"
            :alt="post.poster.name"
          />
          <div class="flex flex-col gap-0 justify-center">
            <span class="font-semibold text-sm">{{ post.poster.name }}</span>
            <span class="text-gray-300 text-sm" style="color: #c4c4c4">{{
              post.poster.position
            }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      posts: [
        {
          rating: 5,
          speech: `Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.`,
          poster: {
            avatar: '/images/posts/avatar-1.png',
            name: 'Jane Doe',
            position: 'Digital marketer',
          },
        },
        {
          rating: 5,
          speech: `Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.`,
          poster: {
            avatar: '/images/posts/avatar-2.png',
            name: 'Julia Shumway',
            position: 'Sales consultaint',
          },
        },
        {
          rating: 5,
          speech: `Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.`,
          poster: {
            avatar: '/images/posts/avatar-3.png',
            name: 'Samantha Wheeler',
            position: 'Business analyst',
          },
        },
        {
          rating: 5,
          speech: `Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.`,
          poster: {
            avatar: '/images/posts/avatar-4.png',
            name: 'Alexander Perce',
            position: 'CEO bonga',
          },
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
@import '~assets/scss/breakpoints.scss';
.posts {
  margin: 50px auto;
  &__title {
    display: block;
    text-align: center;
    color: #161616;
    font-weight: 600;
    font-size: 25px;

    @include media-breakpoint-up(md) {
      font-size: 48px;
      margin-bottom: 20px;
    }
  }

  .container {
    &__post {
      display: inline-block;
      margin-top: 32px;

      &--rating {
        display: flex;
        width: 100%;

        img {
          margin-right: 10px;
        }
      }

      &--speech {
        margin: 10px 0px;
        display: block;
        max-width: 250px;
        text-align: left;
        font-weight: 18px;
        line-height: 27px;
        font-weight: 400;
        color: #888888;
      }

      &--poster {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 20px;
        .avatar {
          border-radius: 50%;
          height: 45px;
          width: 45px;
          display: block;
          margin-right: 8px;
        }
      }
    }
  }
}
</style>
>>>>>>> b1a5db2cf54869e1abeecb331a049e0f59481d5b
