<template>
    <div>
        <div style="margin-left:0.1em;margin-right:0.1em;margin-bottom:1em" class="box">
            <b-tag style="margin-left:0em" type="is-alarm">ALARM</b-tag>
            <b-tag style="margin-left:0em" type="is-alarm-status">{{this.status}}</b-tag>
            <el-button style="float:right" size="mini" icon="el-icon-delete" circle></el-button>
            <span style="margin-left:0em" class="tag">
                <font-awesome-icon icon="file-code" style="margin-right:0.25em"/>
                {{this.hash}}
            </span>
            <b-tag style="margin-left:0em; margin-top:0.5em" class="tag" type="is-grey">
                <font-awesome-icon icon="clock" style="margin-right:0.25em"/>
                {{moment(this.timestamp).format('hh:mm:ss a')}}
            </b-tag>
            <!-- this.status === T_REQUESTS -->
            <div v-show="!(this.status==='M_APPROVED')">
                <p class="heading">TARGET</p>
                <p style="margin-bottom:0;padding-bottom:0;" class="subtitle">
                    {{this.target}}
                    <br>
                </p>
                <hr>
                <p class="heading">ATTACK ORIGIN</p>
                <p style="margin-bottom:0;padding-bottom:0;" class="subtitle">
                    {{this.subnetwork}}
                    <br>
                    <span>
                        <font-awesome-icon style="margin-right:.25em" icon="shield-alt"/>
                        {{this.action}}
                    </span>
                    <br>
                    <span>
                        <font-awesome-icon style="margin-right:.25em" icon="bug"/>
                        {{this.addresses.length}} Attackers
                    </span>
                </p>
                <br>
                <el-button-group>
                    <el-button v-on:click="declineMREQ()" size="mini">
                        <font-awesome-icon
                            @click="dialogFormVisible = true"
                            icon="hands-helping"
                            style="margin-right:0.25em"
                        />Request Help
                    </el-button>
                </el-button-group>
            </div>
        </div>
        <el-dialog title="Shipping address" :visible.sync="dialogFormVisible">
            <el-form :model="form">
                <el-form-item label="Promotion name" :label-width="formLabelWidth">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="Zones" :label-width="formLabelWidth">
                    <el-select v-model="form.region" placeholder="Please select a zone">
                        <el-option label="Zone No.1" value="shanghai"></el-option>
                        <el-option label="Zone No.2" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">Cancel</el-button>
                <el-button type="primary" @click="dialogFormVisible = false">Confirm</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
  data: function() {
    return {
      dialogFormVisible: false
    };
  },
  name: "attack-alarm",
  props: {
    hash: String,
    target: String,
    timestamp: String,
    action: String,
    subnetwork: String,
    addresses: {
      type: Array
    },
    status: String
  },
  methods: {
    showDetails() {
      this.$emit("showRequestDetailsEvent", this.$vnode.key);
      // Add this to component in Home.vue : @showRequestDetails="showDetails" and call function
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
span {
  margin-left: 0.5em;
  font-size: 12px;
  font-family: "Source Code Pro Regular";
}
hr {
  display: block;
  margin-top: 0.5em;
  margin-bottom: 0.5em;
  margin-left: auto;
  margin-right: auto;
  border-style: inset;
  border-width: 0.6px;
  color: #efefef;
}
p {
  margin: 0.5em 0 0.5em 0;
}
</style>
