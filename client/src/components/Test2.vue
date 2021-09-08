  <template>
    <div class="grid">
      <vs-row>
        <vs-col :key="index" v-for="col,index in 3" w="2">
          Default {{ index + 1 }}
        </vs-col>
      </vs-row>

      <vs-row justify="center">
        <vs-col :key="index" v-for="col,index in 3" w="2">
          Center {{ index + 1 }}
        </vs-col>
      </vs-row>

      <vs-row justify="flex-end">
        <vs-col :key="index" v-for="col,index in 3" w="2">
          Flex-end {{ index + 1 }}
        </vs-col>
      </vs-row>


      <vs-row justify="space-around">
        <vs-col :key="index" v-for="col,index in 3" w="2">
          Space-around {{ index + 1 }}
        </vs-col>
      </vs-row>

      <vs-row justify="space-between">
        <vs-col :key="index" v-for="col,index in 3" w="2">
          Space-between {{ index + 1 }}
        </vs-col>
      </vs-row>
    </div>
  </template>
