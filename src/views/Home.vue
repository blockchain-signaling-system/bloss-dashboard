<template>
  <div>
    <section class="section">
      <div class="container">
        <b-modal :active.sync="isAlarmReportModalActive" :width="640" scroll="keep">
          <div class="card">
            <div class="card-content">
              <div class="media">
                <div class="media-left">
                  <b-tag
                    v-show="this.detailAlarmReport.status===this.constants.NEW_ALARM"
                    style="margin-left:0em"
                    type="is-new-mitigation-req"
                  >{{this.detailAlarmReport.status}}</b-tag>
                  <b-tag
                    v-show="this.detailAlarmReport.status===this.constants.REQ_MITIGATION_REQUESTED"
                    style="margin-left:0em"
                    type="is-req-mitigation-requested"
                  >{{this.detailAlarmReport.status}}</b-tag>
                  <b-tag
                    v-show="this.detailAlarmReport.status===this.constants.REQ_MITIGATION_ACCEPTED"
                    style="margin-left:0em"
                    type="is-req-mitigation-accepted"
                  >{{this.detailAlarmReport.status}}</b-tag>
                  <b-tag
                    v-show="this.detailAlarmReport.status===this.constants.REQ_MITIGATION_DECLINED"
                    style="margin-left:0em"
                    type="is-req-mitigation-declined"
                  >{{this.detailAlarmReport.status}}</b-tag>
                  <b-tag
                    v-show="this.detailAlarmReport.status===this.constants.REQ_MITIGATION_IN_PROGRESS"
                    style="margin-left:0em"
                    type="is-req-mitigation-in-progress"
                  >{{this.detailAlarmReport.status}}</b-tag>
                  <b-tag
                    v-show="this.detailAlarmReport.status===this.constants.REQ_MITIGATION_SUCCESSFUL"
                    style="margin-left:0em;"
                    type="is-req-mitigation-successful"
                  >{{this.detailAlarmReport.status}}</b-tag>
                  <span style="margin-left:0em" class="tag">
                    <font-awesome-icon icon="file-code" style="margin-right:0.25em"/>
                    {{this.detailAlarmReport.hash}}
                  </span>
                </div>
              </div>
              <div class="media-content">
                <p class="title">
                  REQUEST MITIGATION
                  <small>{{moment(this.detailAlarmReport.timestamp).format('hh:mm:ss a')}}</small>
                </p>
                <p style="margin-top:1em; margin-bottom: 0.5em;" class="heading">STATUS</p>
                <!-- BEGIN NEW_ALARM -->
                <div v-show="(this.detailAlarmReport.status==this.constants.NEW_ALARM)">
                  <el-steps direction="vertical" :active="1">
                    <el-step :title="this.constants.NEW_ALARM"></el-step>
                    <el-step
                      :title="this.constants.REQ_MITIGATION_REQUESTED + ' OR '+ this.constants.ALARM_IGNORED"
                    ></el-step>
                  </el-steps>
                </div>
                <!-- END NEW_ALARM -->
                 <!-- BEGIN NEW_ALARM -->
                <div v-show="(this.detailAlarmReport.status==this.constants.ALARM_IGNORED)">
                  <el-steps direction="vertical" :active="1">
                    <el-step :title="this.constants.NEW_ALARM"></el-step>
                    <el-step
                      :title="this.constants.ALARM_IGNORED"
                    ></el-step>
                  </el-steps>
                </div>
                <!-- END NEW_ALARM -->
                <!-- BEGIN REQ_MITIGATION_REQUESTED -->
                <div
                  v-show="(this.detailAlarmReport.status==this.constants.REQ_MITIGATION_REQUESTED)"
                >
                  <el-steps direction="vertical" :active="2">
                    <el-step
                      :title="this.constants.NEW_ALARM"
                      :description="'Alarmed at ' +moment(this.detailAlarmReport.timestamp).format('hh:mm:ss a')"
                    ></el-step>
                    <el-step
                      :title="this.constants.REQ_MITIGATION_REQUESTED"
                      :description="'Requested at ' +moment(this.detailAlarmReport.timestamp_requested).format('hh:mm:ss a')"
                    ></el-step>
                  </el-steps>
                  <font-awesome-icon style="margin-right:.75em" icon="spinner" pulse/>Waiting for answer from Mitigator
                </div>
                <!-- END REQ_MITIGATION_REQUESTED -->
                <!-- BEGIN REQ_MITIGATION_DECLINED -->
                <div
                  v-show="(this.detailAlarmReport.status==this.constants.REQ_MITIGATION_DECLINED)"
                >
                  <el-steps direction="vertical" :active="2">
                    <el-step
                      :title="this.constants.NEW_ALARM"
                      :description="'Alarmed at ' +moment(this.detailAlarmReport.timestamp).format('hh:mm:ss a')"
                    ></el-step>
                    <el-step
                      :title="this.constants.REQ_MITIGATION_REQUESTED"
                      :description="'Requested at ' +moment(this.detailAlarmReport.timestamp_requested).format('hh:mm:ss a')"
                    ></el-step>
                    <el-step
                      :title="this.constants.REQ_MITIGATION_DECLINED"
                      :description="'Declined at ' +moment(this.detailAlarmReport.timestamp_declined).format('hh:mm:ss a')"
                    ></el-step>
                  </el-steps>
                </div>
                <!-- END REQ_MITIGATION_DECLINED -->
                <!-- BEGIN REQ_MITIGATION_ACCEPTED -->
                <div
                  v-show="(this.detailAlarmReport.status==this.constants.REQ_MITIGATION_ACCEPTED)"
                >
                  <el-steps direction="vertical" :active="2">
                    <el-step
                      :title="this.constants.NEW_ALARM"
                      :description="'Alarmed at ' +moment(this.detailAlarmReport.timestamp_requested).format('hh:mm:ss a')"
                    ></el-step>
                    <el-step
                      :title="this.constants.REQ_MITIGATION_REQUESTED"
                      :description="'Requested at ' +moment(this.detailAlarmReport.timestamp_requested).format('hh:mm:ss a')"
                    ></el-step>
                    <el-step
                      :title="this.constants.REQ_MITIGATION_ACCEPTED"
                      :description="'Accepted at ' +moment(this.detailAlarmReport.timestamp_accepted).format('hh:mm:ss a')"
                    ></el-step>
                  </el-steps>
                  <font-awesome-icon style="margin-right:.75em" icon="spinner" pulse/>Waiting for blocking ...
                </div>
                <!-- END REQ_MITIGATION_ACCEPTED -->
                <!-- BEGIN REQ_MITIGATION_IN_PROGRESS -->
                <div
                  v-show="(this.detailAlarmReport.status==this.constants.REQ_MITIGATION_IN_PROGRESS)"
                >
                  <el-steps direction="vertical" :active="3">
                    <el-step
                      :title="this.constants.NEW_ALARM"
                      :description="'Requested at ' +moment(this.detailAttackReport.timestamp_requested).format('hh:mm:ss a')"
                    ></el-step>
                    <el-step
                      :title="this.constants.REQ_MITIGATION_REQUESTED"
                      :description="'Requested at ' +moment(this.detailAttackReport.timestamp_requested).format('hh:mm:ss a')"
                    ></el-step>
                    <el-step
                      :title="this.constants.REQ_MITIGATION_ACCEPTED"
                      :description="'Accepted at ' +moment(this.detailAttackReport.timestamp_accepted).format('hh:mm:ss a')"
                    ></el-step>
                    <el-step
                      :title="this.constants.REQ_MITIGATION_IN_PROGRESS"
                      :description="'Blocking at ' +moment(this.detailAttackReport.timestamp_in_progress).format('hh:mm:ss a')"
                    ></el-step>
                  </el-steps>
                </div>
                <!-- END REQ_MITIGATION_IN_PROGRESS -->
                <!-- BEGIN REQ_MITIGATION_SUCCESSFUL -->
                <div
                  v-show="(this.detailAlarmReport.status==this.constants.REQ_MITIGATION_SUCCESSFUL)"
                >
                  <el-steps direction="vertical" :active="4">
                    <el-step
                      :title="this.constants.NEW_ALARM"
                      :description="'Requested at ' +moment(this.detailAlarmReport.timestamp).format('hh:mm:ss a')"
                    ></el-step>
                    <el-step
                      :title="this.constants.REQ_MITIGATION_REQUESTED"
                      :description="'Requested at ' +moment(this.detailAlarmReport.timestamp_requested).format('hh:mm:ss a')"
                    ></el-step>
                    <el-step
                      :title="this.constants.REQ_MITIGATION_ACCEPTED"
                      :description="'Accepted at ' +moment(this.detailAlarmReport.timestamp_accepted).format('hh:mm:ss a')"
                    ></el-step>
                    <el-step
                      :title="this.constants.REQ_MITIGATION_IN_PROGRESS"
                      :description="'Blocking at ' +moment(this.detailAlarmReport.timestamp_in_progress).format('hh:mm:ss a')"
                    ></el-step>
                    <el-step
                      :title="this.constants.REQ_MITIGATION_SUCCESSFUL"
                      :description="'Finished at ' +moment(this.detailAlarmReport.timestamp_successful).format('hh:mm:ss a')"
                    ></el-step>
                  </el-steps>
                </div>
                <!-- END REQ_MITIGATION_SUCCESSFUL -->
                <br>
                <p class="heading">TARGET</p>
                <p
                  style="margin-bottom:0;padding-bottom:0;"
                  class="subtitle"
                >{{this.detailAlarmReport.target}}</p>
                <span>
                  <font-awesome-icon style="margin-right:.25em" :icon="['fab', 'ethereum']"/>0.0434 ETH
                </span>
                <hr>
                <p class="heading">ATTACK ORIGIN</p>
                <p
                  style="margin-bottom:0;padding-bottom:0;"
                  class="subtitle"
                >{{this.detailAlarmReport.subnetwork}}</p>
                <span>
                  <font-awesome-icon style="margin-right:.25em" icon="shield-alt"/>
                  {{this.detailAlarmReport.action}}
                </span>
                <br>
                <span>
                  <font-awesome-icon style="margin-right:.25em" icon="bug"/>
                  {{this.detailAlarmReport.addresses}}
                </span>
                <br>
                <br>
                <el-button-group
                  v-show="(this.detailAlarmReport.status===this.constants.NEW_ALARM)"
                >
                  <el-button v-on:click="requestMitigation()" size="mini">
                    <font-awesome-icon icon="hands-helping" style="margin-right:0.25em"/>Request Help
                  </el-button>
                </el-button-group>
              </div>
            </div>
          </div>
        </b-modal>
        <b-modal :active.sync="isAttackReportModalActive" :width="640" scroll="keep">
          <div class="card">
            <div class="card-content">
              <div class="media">
                <div class="media-left">
                  <b-tag
                    v-show="this.detailAttackReport.status==='NEW_MITIGATION_REQ'"
                    style="margin-left:0em"
                    type="is-new-mitigation-req"
                  >{{this.detailAttackReport.status}}</b-tag>
                  <b-tag
                    v-show="this.detailAttackReport.status==='MITIGATION_REQ_ACCEPTED'"
                    style="margin-left:0em"
                    type="is-mitigation-req-accepted"
                  >{{this.detailAttackReport.status}}</b-tag>
                  <b-tag
                    v-show="this.detailAttackReport.status==='MITIGATION_REQ_DECLINED'"
                    style="margin-left:0em"
                    type="is-mitigation-req-declined"
                  >{{this.detailAttackReport.status}}</b-tag>
                  <b-tag
                    v-show="this.detailAttackReport.status==='MITIGATION_REQ_IN_PROGRESS'"
                    style="margin-left:0em"
                    type="is-mitigation-req-in-progress"
                  >{{this.detailAttackReport.status}}</b-tag>
                  <b-tag
                    v-show="this.detailAttackReport.status==='MITIGATION_REQ_SUCCESSFUL'"
                    style="margin-left:0em;"
                    type="is-mitigation-req-successful"
                  >{{this.detailAttackReport.status}}</b-tag>
                  <span style="margin-left:0em" class="tag">
                    <font-awesome-icon icon="file-code" style="margin-right:0.25em"/>
                    {{this.detailAttackReport.hash}}
                  </span>
                </div>
              </div>
              <div class="media-content">
                <p class="title">
                  MITIGATION REQUEST
                  <small>{{moment(this.detailAttackReport.timestamp).format('hh:mm:ss a')}}</small>
                </p>
                <p style="margin-top:1em; margin-bottom: 0.5em;" class="heading">STATUS</p>
                <!-- BEGIN NEW_MITIGATION_REQ -->
                <div v-show="(this.detailAttackReport.status==this.constants.NEW_MITIGATION_REQ)">
                  <el-steps direction="vertical" :active="0">
                    <el-step
                      :title="this.detailAttackReport.status"
                      :description="'Requested at ' +moment(this.detailAttackReport.timestamp_requested).format('hh:mm:ss a')"
                    ></el-step>
                    <el-step
                      :title="this.constants.MITIGATION_REQ_ACCEPTED + ' OR '+ this.constants.MITIGATION_REQ_DECLINED"
                    ></el-step>
                  </el-steps>
                </div>
                <!-- END NEW_MITIGATION_REQ -->
                <!-- BEGIN MITIGATION_REQ_ACCEPTED -->
                <div
                  v-show="(this.detailAttackReport.status==this.constants.MITIGATION_REQ_ACCEPTED)"
                >
                  <el-steps direction="vertical" :active="1">
                    <el-step
                      :title="this.constants.NEW_MITIGATION_REQ"
                      :description="'Requested at ' +moment(this.detailAttackReport.timestamp_requested).format('hh:mm:ss a')"
                    ></el-step>
                    <el-step
                      :title="this.detailAttackReport.status"
                      :description="'Accepted at ' +moment(this.detailAttackReport.timestamp_accepted).format('hh:mm:ss a')"
                    ></el-step>
                  </el-steps>
                  <font-awesome-icon style="margin-right:.75em" icon="spinner" pulse/>Waiting for blocking
                </div>
                <!-- END MITIGATION_REQ_ACCEPTED -->
                <!-- BEGIN MITIGATION_REQ_DECLINED -->
                <div
                  v-show="(this.detailAttackReport.status==this.constants.MITIGATION_REQ_DECLINED)"
                >
                  <el-steps direction="vertical" :active="1">
                    <el-step
                      :title="this.constants.NEW_MITIGATION_REQ"
                      :description="'Requested at ' +moment(this.detailAttackReport.timestamp_requested).format('hh:mm:ss a')"
                    ></el-step>
                    <el-step
                      :title="this.detailAttackReport.status"
                      :description="'Declined at ' +moment(this.detailAttackReport.timestamp_declined).format('hh:mm:ss a')"
                    ></el-step>
                  </el-steps>
                </div>
                <!-- END MITIGATION_REQ_DECLINED -->
                <!-- BEGIN MITIGATION_REQ_IN_PROGRESS -->
                <div
                  v-show="(this.detailAttackReport.status==this.constants.MITIGATION_REQ_IN_PROGRESS)"
                >
                  <el-steps direction="vertical" :active="2">
                    <el-step
                      :title="this.constants.NEW_MITIGATION_REQ"
                      :description="'Requested at ' +moment(this.detailAttackReport.timestamp_requested).format('hh:mm:ss a')"
                    ></el-step>
                    <el-step
                      :title="this.constants.MITIGATION_REQ_ACCEPTED"
                      :description="'Accepted at ' +moment(this.detailAttackReport.timestamp_accepted).format('hh:mm:ss a')"
                    ></el-step>
                    <el-step
                      :title="this.constants.MITIGATION_REQ_IN_PROGRESS"
                      :description="'Blocking at ' +moment(this.detailAttackReport.timestamp_in_progress).format('hh:mm:ss a')"
                    ></el-step>
                  </el-steps>
                  <font-awesome-icon style="margin-right:.75em" icon="spinner" pulse/>Blocking ...
                </div>
                <!-- END MITIGATION_REQ_IN_PROGRESS -->
                <!-- BEGIN MITIGATION_REQ_IN_PROGRESS -->
                <div
                  v-show="(this.detailAttackReport.status==this.constants.MITIGATION_REQ_SUCCESSFUL)"
                >
                  <el-steps direction="vertical" :active="3">
                    <el-step
                      :title="this.constants.NEW_MITIGATION_REQ"
                      :description="'Requested at ' +moment(this.detailAttackReport.timestamp_requested).format('hh:mm:ss a')"
                    ></el-step>
                    <el-step
                      :title="this.constants.MITIGATION_REQ_ACCEPTED"
                      :description="'Accepted at ' +moment(this.detailAttackReport.timestamp_accepted).format('hh:mm:ss a')"
                    ></el-step>
                    <el-step
                      :title="this.constants.MITIGATION_REQ_IN_PROGRESS"
                      :description="'Blocking at ' +moment(this.detailAttackReport.timestamp_in_progress).format('hh:mm:ss a')"
                    ></el-step>
                    <el-step
                      :title="this.constants.MITIGATION_REQ_SUCCESSFUL"
                      :description="'Finished at ' +moment(this.detailAttackReport.timestamp_successful).format('hh:mm:ss a')"
                    ></el-step>
                  </el-steps>
                </div>
                <!-- END MITIGATION_REQ_IN_PROGRESS -->
                <br>
                <p class="heading">TARGET</p>
                <p
                  style="margin-bottom:0;padding-bottom:0;"
                  class="subtitle"
                >{{this.detailAttackReport.target}}</p>
                <span>
                  <font-awesome-icon style="margin-right:.25em" :icon="['fab', 'ethereum']"/>0.0434 ETH
                </span>
                <span>
                  <font-awesome-icon style="margin-right:.25em" icon="star-half-alt"/>65% Reputation
                </span>
                <hr>
                <p class="heading">ATTACK ORIGIN</p>
                <p
                  style="margin-bottom:0;padding-bottom:0;"
                  class="subtitle"
                >{{this.detailAttackReport.subnetwork}}</p>
                <span>
                  <font-awesome-icon style="margin-right:.25em" icon="shield-alt"/>
                  {{this.detailAttackReport.action}}
                </span>
                <br>
                <span>
                  <font-awesome-icon style="margin-right:.25em" icon="bug"/>
                  {{this.detailAttackReport.addresses}}
                </span>
                <br>
                <br>
                <el-button-group
                  v-show="(this.detailAttackReport.status===this.constants.NEW_MITIGATION_REQ)"
                >
                  <el-button v-on:click="declineMREQ()" size="mini">
                    <font-awesome-icon icon="times" style="margin-right:0.25em"/>DECLINE
                  </el-button>
                  <el-button v-on:click="acceptMREQ()" size="mini">
                    <font-awesome-icon icon="check" style="margin-right:0.25em"/>ACCEPT
                  </el-button>
                </el-button-group>
              </div>
            </div>
          </div>
        </b-modal>
        <div class="columns">
          <div class="column">
            <div class="box">
              <h1 class="title">BLOSS</h1>
              <h1 class="subtitle is-6">{{this.subtitle}}</h1>
              <article class="media">
                <div class="media-content">
                  <div class="content">
                    <p>
                      <a-badge :status="isConnected ? 'success' : 'warning'"/>
                      <b-tooltip
                        :label="isConnected ? 'WSConn to bloss-node instance successful.' : 'Establishing connection...'"
                        position="is-top"
                        animated
                        :type="isConnected ? 'is-success' : 'is-warning'"
                      >
                        <b-tag
                          style="height:2.3em;margin-left:0em;"
                          class="tag"
                          :type="isConnected ? 'is-success' : 'is-warning'"
                        >WEBSOCKET</b-tag>
                      </b-tooltip>
                      <span>
                        <font-awesome-icon v-show="!isConnected" icon="spinner" pulse/>
                      </span>
                    </p>
                    <p>
                      <a-badge :status="isControllerAvailable ? 'success' : 'warning'"/>
                      <b-tag
                        style="height:2.3em;margin-left:0em;"
                        class="tag"
                        :type="isControllerAvailable ? 'is-success' : 'is-warning'"
                      >CONTROLLER</b-tag>
                      <span>
                        <font-awesome-icon v-show="!isControllerAvailable" icon="spinner" pulse/>
                      </span>
                    </p>
                    <div v-show="isControllerAvailable">
                      <div class="tile">
                        <a-badge :status="serviceStatusBloss ? 'success' : 'error'"/>
                        <b-tag
                          style="height:2.3em;margin-left:0em;"
                          class="tag"
                          :type="serviceStatusBloss ? 'is-success' : 'is-warning'"
                        >BLOSS
                          <font-awesome-icon
                            :icon="serviceStatusBloss ? 'check' : 'pause-circle'"
                            style="margin-right:0.25em"
                          />
                        </b-tag>
                        <el-button-group>
                          <el-button
                            v-on:click="startService('bloss')"
                            style="padding=0.25em"
                            size="mini"
                          >
                            <font-awesome-icon icon="play" style="margin-right:0.25em"/>
                          </el-button>
                          <el-button v-on:click="killService('bloss')" size="mini">
                            <font-awesome-icon icon="stop" style="margin-right:0.25em"/>
                          </el-button>
                        </el-button-group>
                      </div>
                      <a-badge :status="serviceStatusGeth ? 'success' : 'error'"/>
                      <b-tag
                        style="height:2.3em;margin-left:0em;"
                        class="tag"
                        :type="serviceStatusGeth ? 'is-success' : 'is-warning'"
                      >GETH
                        <font-awesome-icon
                          :icon="serviceStatusGeth ? 'check' : 'pause-circle'"
                          style="margin-right:0.25em"
                        />
                      </b-tag>
                      <el-button-group>
                        <el-button style="padding=0.25em" size="mini">
                          <font-awesome-icon
                            @click="startService('geth')"
                            icon="play"
                            style="margin-right:0.25em"
                          />
                        </el-button>
                        <el-button size="mini">
                          <font-awesome-icon
                            @click="killService('geth')"
                            icon="stop"
                            style="margin-right:0.25em"
                          />
                        </el-button>
                      </el-button-group>
                      <br>
                      <a-badge :status="serviceStatusIPFS ? 'success' : 'error'"/>
                      <b-tag
                        style="height:2.3em;margin-left:0em;"
                        class="tag"
                        :type="serviceStatusIPFS ? 'is-success' : 'is-warning'"
                      >IPFS
                        <font-awesome-icon
                          :icon="serviceStatusIPFS ? 'check' : 'pause-circle'"
                          style="margin-right:0.25em"
                        />
                      </b-tag>
                      <el-button-group>
                        <el-button style="padding=0.25em" size="mini">
                          <font-awesome-icon
                            @click="startService('ipfs')"
                            icon="play"
                            style="margin-right:0.25em"
                          />
                        </el-button>
                        <el-button @click.native="killService('ipfs')" size="mini">
                          <font-awesome-icon icon="stop" style="margin-right:0.25em"/>
                        </el-button>
                      </el-button-group>
                    </div>
                  </div>
                </div>
              </article>
            </div>
          </div>
          <div class="column is-three-quarters">
            <el-tabs tab-position="top" style="height: 200px;">
              <el-tab-pane label="REQUESTS">
                <span slot="label">
                  <font-awesome-icon icon="inbox" style="margin-right:0.25em"/>REQUESTS
                </span>
                <div class="columns">
                  <div class="column">
                    <p style="margin-top:0.5em" class="col-title">REQUESTS</p>
                    <mitigation-request
                      @showRequestDetailsEvent="showDetails(mit._id)"
                      @declineMREQEvent="declineMREQ(mit._id)"
                      @acceptMREQEvent="acceptMREQ(mit._id)"
                      v-for="mit in newMitigationRequests"
                      v-bind:key="mit.key"
                      v-bind:hash="mit.hash"
                      v-bind:target="mit.target"
                      v-bind:timestamp="mit.timestamp"
                      v-bind:timestamp_requested="mit.timestamp_requested"
                      v-bind:timestamp_accepted="mit.timestamp_accepted"
                      v-bind:timestamp_declined="mit.timestamp_declined"
                      v-bind:timestamp_in_progress="mit.timestamp_in_progress"
                      v-bind:timestamp_successful="mit.timestamp_successful"
                      v-bind:action="mit.action"
                      v-bind:subnetwork="mit.subnetwork"
                      v-bind:addresses="mit.addresses"
                      v-bind:status="mit.status"
                    ></mitigation-request>
                    <div v-if="newMitigationRequests.length === 0">
                      <el-alert title=" No new MREQ" type="info" :closable="false"></el-alert>
                    </div>
                  </div>
                  <div class="column">
                    <p style="margin-top:0.5em" class="col-title">IN PROGRESS</p>
                    <mitigation-request
                      @showRequestDetailsEvent="showDetails(mit._id)"
                      @declineMREQEvent="declineMREQ(mit._id)"
                      @acceptMREQEvent="acceptMREQ(mit._id)"
                      v-for="mit in acceptedAndProgressMitigationRequests"
                      v-bind:key="mit._id"
                      v-bind:hash="mit.hash"
                      v-bind:target="mit.target"
                      v-bind:timestamp="mit.timestamp"
                      v-bind:timestamp_requested="mit.timestamp_requested"
                      v-bind:timestamp_accepted="mit.timestamp_accepted"
                      v-bind:timestamp_declined="mit.timestamp_declined"
                      v-bind:timestamp_in_progress="mit.timestamp_in_progress"
                      v-bind:timestamp_successful="mit.timestamp_successful"
                      v-bind:action="mit.action"
                      v-bind:subnetwork="mit.subnetwork"
                      v-bind:addresses="mit.addresses"
                      v-bind:status="mit.status"
                    ></mitigation-request>
                    <div v-if="acceptedAndProgressMitigationRequests.length === 0">
                      <el-alert title=" No MREQ in progress" type="info" :closable="false"></el-alert>
                    </div>
                  </div>
                  <div class="column">
                    <p style="margin-top:0.5em" class="col-title">LOG</p>
                    <mitigation-request
                      @showRequestDetailsEvent="showDetails(mit._id)"
                      @declineMREQEvent="declineMREQ(mit._id)"
                      @acceptMREQEvent="acceptMREQ(mit._id)"
                      v-for="mit in successfulAndDeclinedMitigationRequests"
                      v-bind:key="mit._id"
                      v-bind:hash="mit.hash"
                      v-bind:target="mit.target"
                      v-bind:timestamp="mit.timestamp"
                      v-bind:timestamp_requested="mit.timestamp_requested"
                      v-bind:timestamp_accepted="mit.timestamp_accepted"
                      v-bind:timestamp_declined="mit.timestamp_declined"
                      v-bind:timestamp_in_progress="mit.timestamp_in_progress"
                      v-bind:timestamp_successful="mit.timestamp_successful"
                      v-bind:action="mit.action"
                      v-bind:subnetwork="mit.subnetwork"
                      v-bind:addresses="mit.addresses"
                      v-bind:status="mit.status"
                    ></mitigation-request>
                    <div v-if="successfulAndDeclinedMitigationRequests.length === 0">
                      <el-alert title=" No finalized MREQ" type="info" :closable="false"></el-alert>
                    </div>
                  </div>
                </div>
              </el-tab-pane>
              <el-tab-pane label="ALARMS">
                <span slot="label">
                  <font-awesome-icon icon="share-square" style="margin-right:0.25em"/>ALARMS
                </span>
                <div class="columns">
                  <div class="column">
                    <p style="margin-top:0.5em" class="col-title">ALARMS</p>
                    <attack-alarm
                      @showAlarmDetailsEvent="showAlarmDetails(reqMit._id)"
                      @ignoreAlarmEvent="ignoreAlarm(reqMit._id)"
                      @requestMitigationEvent="requestMitigation(reqMit._id)"
                      v-for="reqMit in newAlarms"
                      v-bind:key="reqMit.key"
                      v-bind:hash="reqMit.hash"
                      v-bind:target="reqMit.target"
                      v-bind:timestamp="reqMit.timestamp"
                      v-bind:timestamp_requested="reqMit.timestamp_requested"
                      v-bind:timestamp_accepted="reqMit.timestamp_accepted"
                      v-bind:timestamp_declined="reqMit.timestamp_declined"
                      v-bind:timestamp_in_progress="reqMit.timestamp_in_progress"
                      v-bind:timestamp_successful="reqMit.timestamp_successful"
                      v-bind:action="reqMit.action"
                      v-bind:subnetwork="reqMit.subnetwork"
                      v-bind:addresses="reqMit.addresses"
                      v-bind:status="reqMit.status"
                    ></attack-alarm>
                    <div v-if="newAlarms.length === 0">
                      <el-alert title=" No new alarms" type="info" :closable="false"></el-alert>
                    </div>
                  </div>
                  <div class="column">
                    <p style="margin-top:0.5em" class="col-title">IN PROGRESS</p>
                    <attack-alarm
                      @showAlarmDetailsEvent="showAlarmDetails(reqMit._id)"
                      @ignoreAlarmEvent="ignoreAlarm(reqMit._id)"
                      @requestMitigationEvent="requestMitigation(reqMit._id)"
                      v-for="reqMit in requestedAcceptedAndProgressRequestMitigations"
                      v-bind:key="reqMit.key"
                      v-bind:hash="reqMit.hash"
                      v-bind:target="reqMit.target"
                      v-bind:timestamp="reqMit.timestamp"
                      v-bind:timestamp_requested="reqMit.timestamp_requested"
                      v-bind:timestamp_accepted="reqMit.timestamp_accepted"
                      v-bind:timestamp_declined="reqMit.timestamp_declined"
                      v-bind:timestamp_in_progress="reqMit.timestamp_in_progress"
                      v-bind:timestamp_successful="reqMit.timestamp_successful"
                      v-bind:action="reqMit.action"
                      v-bind:subnetwork="reqMit.subnetwork"
                      v-bind:addresses="reqMit.addresses"
                      v-bind:status="reqMit.status"
                    ></attack-alarm>
                    <div v-if="requestedAcceptedAndProgressRequestMitigations.length === 0">
                      <el-alert title=" No REQM in progress" type="info" :closable="false"></el-alert>
                    </div>
                  </div>
                  <div class="column">
                    <p style="margin-top:0.5em" class="col-title">LOG</p>
                    <attack-alarm
                      @showAlarmDetailsEvent="showAlarmDetails(reqMit._id)"
                      @ignoreAlarmEvent="ignoreAlarm(reqMit._id)"
                      @requestMitigationEvent="requestMitigation(reqMit._id)"
                      v-for="reqMit in ignoredDeclinedAndSuccessfulRequestMitigations"
                      v-bind:key="reqMit.key"
                      v-bind:hash="reqMit.hash"
                      v-bind:target="reqMit.target"
                      v-bind:timestamp="reqMit.timestamp"
                      v-bind:timestamp_requested="reqMit.timestamp_requested"
                      v-bind:timestamp_accepted="reqMit.timestamp_accepted"
                      v-bind:timestamp_declined="reqMit.timestamp_declined"
                      v-bind:timestamp_in_progress="reqMit.timestamp_in_progress"
                      v-bind:timestamp_successful="reqMit.timestamp_successful"
                      v-bind:action="reqMit.action"
                      v-bind:subnetwork="reqMit.subnetwork"
                      v-bind:addresses="reqMit.addresses"
                      v-bind:status="reqMit.status"
                    ></attack-alarm>
                    <div v-if="ignoredDeclinedAndSuccessfulRequestMitigations.length === 0">
                      <el-alert title=" No finalized REQM" type="info" :closable="false"></el-alert>
                    </div>
                  </div>
                </div>
              </el-tab-pane>
              <el-tab-pane label="CONFIG">
                <span slot="label">
                  <font-awesome-icon icon="cogs" style="margin-right:0.25em"/>CONFIG
                </span>
                <div class="column">
                  <p style="margin-top:0.5em" class="col-title">SETTINGS</p>
                  <section>
                    <div class="field">
                      <b-switch v-model="autoAcceptRequests" type="is-success">AUTO-ACCEPT Requests</b-switch>
                    </div>
                    <div class="field">
                      <b-switch v-model="autoAcceptAlarms" type="is-success">AUTO-ACCEPT Alarms</b-switch>
                    </div>
                  </section>
                </div>
              </el-tab-pane>
            </el-tabs>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
// @ is an alias to /src
import MitigationRequest from "@/components/MitigationRequest.vue";
import AttackAlarm from "@/components/AttackAlarm.vue";
import constants from "@/constants";

export default {
  data() {
    return {
      subtitle: process.env.VUE_APP_CONTROLLER,
      isConnected: false,
      constants: constants,
      isControllerAvailable: false,
      socketMessage: "",
      statusMessage: "",
      serviceStatusBloss: false,
      serviceStatusGeth: false,
      serviceStatusIPFS: false,
      serviceStatusInfluxDB: false,
      mitigationRequests: [],
      requestMitigations: [],
      isImageModalActive: false,
      isAttackReportModalActive: false,
      isAlarmReportModalActive: false,
      detailAttackReportIndex: -1,
      detailAttackReport: {},
      detailAlarmReportIndex: -1,
      detailAlarmReport: {},
      autoAcceptRequests: false,
      autoAcceptAlarms: false
    };
  },
  computed: {
    newMitigationRequests: function() {
      return this.mitigationRequests.filter(function(mitigationRequest) {
        return mitigationRequest.status == constants.NEW_MITIGATION_REQ;
      });
    },
    acceptedAndProgressMitigationRequests: function() {
      return this.mitigationRequests.filter(function(mitigationRequest) {
        return (
          mitigationRequest.status == constants.MITIGATION_REQ_ACCEPTED ||
          mitigationRequest.status == constants.MITIGATION_REQ_IN_PROGRESS
        );
      });
    },
    successfulAndDeclinedMitigationRequests: function() {
      return this.mitigationRequests.filter(function(mitigationRequest) {
        return (
          mitigationRequest.status == constants.MITIGATION_REQ_SUCCESSFUL ||
          mitigationRequest.status == constants.MITIGATION_REQ_DECLINED
        );
      });
    },
    newAlarms: function() {
      return this.requestMitigations.filter(function(alarm) {
        return alarm.status == constants.NEW_ALARM;
      });
    },
    requestedAcceptedAndProgressRequestMitigations: function() {
      return this.requestMitigations.filter(function(requestMitigation) {
        return (
          requestMitigation.status == constants.REQ_MITIGATION_REQUESTED ||
          requestMitigation.status == constants.REQ_MITIGATION_ACCEPTED ||
          requestMitigation.status == constants.REQ_MITIGATION_IN_PROGRESS
        );
      });
    },
    ignoredDeclinedAndSuccessfulRequestMitigations: function() {
      return this.requestMitigations.filter(function(requestMitigation) {
        return (
          requestMitigation.status == constants.REQ_MITIGATION_DECLINED ||
          requestMitigation.status == constants.ALARM_IGNORED ||
          requestMitigation.status == constants.REQ_MITIGATION_SUCCESSFUL
        );
      });
    }
  },
  sockets: {
    connect() {
      // Fired when the socket connects.
      this.isConnected = true;
    },
    disconnect() {
      this.isConnected = false;
    },
    // Fired when the server sends something on the "messageChannel" channel.
    isControllerAvailable(data) {
      console.log("got isControllerAvailable from backend", data);
      console.log("autoAcceptRequests" + this.autoAcceptRequests);
      console.log("autoAcceptAlarms" + this.autoAcceptAlarms);
      this.isControllerAvailable = data.controllerAvailability;
    },
    statusChannel(data) {
      if (data.geth != null) {
        if (data.geth === "active") this.updateStatus("geth", true);
        if (data.geth === "inactive") this.updateStatus("geth", false);
      }
      if (data.ipfs != null) {
        if (data.ipfs === "active") this.updateStatus("ipfs", true);
        if (data.ipfs === "inactive") this.updateStatus("ipfs", false);
      }
      if (data.bloss != null) {
        if (data.bloss === "active") this.updateStatus("bloss", true);
        if (data.bloss === "inactive") this.updateStatus("bloss", false);
      }
      console.log(data);
      this.statusMessage = data;
    },
    reportChannel(data) {
      // console.log(data);
      // Add new reports to the array "MitigationRequests"
      console.log(JSON.stringify(data, null, 2));
      console.log(data);
      var attack_report = {
        _id: data.data._id,
        hash: data.data.hash,
        target: data.data.target,
        timestamp: data.data.timestamp,
        timestamp_requested: data.data.timestamp_requested,
        timestamp_accepted: data.data.timestamp_accepted,
        timestamp_declined: data.data.timestamp_declined,
        timestamp_in_progress: data.data.timestamp_in_progress,
        timestamp_successful: data.data.timestamp_successful,
        action: data.data.action,
        subnetwork: data.data.subnetwork,
        addresses: data.data.addresses,
        status: data.data.status
      };

      if (
        data.data.status == constants.MITIGATION_REQ_IN_PROGRESS ||
        data.data.status == constants.MITIGATION_REQ_SUCCESSFUL
      ) {
        console.log("MITIGATION_REQ_IN_PROGRESS arrived");
        var indexOfCurrentReport = this.mitigationRequests.findIndex(
          item => item._id == data.data._id
        );
        console.log("indexOfCurrentReport" + indexOfCurrentReport);
        if (indexOfCurrentReport > -1) {
          this.mitigationRequests.splice(indexOfCurrentReport, 1);
          this.mitigationRequests.push(attack_report);
        }
      } else {
        this.mitigationRequests.push(attack_report);
      }
    },
    alarmChannel(data) {
      // console.log(data);
      // Add new reports to the array "MitigationRequests"
      console.log(JSON.stringify(data, null, 2));

      if (data.data.status == constants.NEW_ALARM) {
        this.displayToast(data.data.status, 3000, "is-alarm");
      }

      console.log("indexOfCurrentReport" + indexOfCurrentReport);

      var alarm_report = {
        _id: data.data._id,
        hash: data.data.hash,
        target: data.data.target,
        timestamp: data.data.timestamp,
        timestamp_requested: data.data.timestamp_requested,
        timestamp_accepted: data.data.timestamp_accepted,
        timestamp_declined: data.data.timestamp_declined,
        timestamp_in_progress: data.data.timestamp_in_progress,
        timestamp_successful: data.data.timestamp_successful,
        action: data.data.action,
        subnetwork: data.data.subnetwork,
        addresses: data.data.addresses,
        status: data.data.status
      };

      if (
        data.data.status == constants.REQ_MITIGATION_ACCEPTED ||
        data.data.status == constants.REQ_MITIGATION_DECLINED ||
        data.data.status == constants.REQ_MITIGATION_IN_PROGRESS ||
        data.data.status == constants.REQ_MITIGATION_SUCCESSFUL
      ) {
        var indexOfCurrentReport = this.requestMitigations.findIndex(
          item => item.hash == data.data.hash
        );
        console.log("indexOfCurrentReport" + indexOfCurrentReport);
        if (indexOfCurrentReport > -1) {
          this.requestMitigations.splice(indexOfCurrentReport, 1);
          this.requestMitigations.push(alarm_report);
        }
      } else {
        this.requestMitigations.push(alarm_report);
      }
    }
  },
  methods: {
    updateStatus(service, status) {
      switch (service) {
        case "geth":
          this.serviceStatusGeth = status;
          break;
        case "ipfs":
          this.serviceStatusIPFS = status;
          break;
        case "bloss":
          this.serviceStatusBloss = status;
          break;
        default:
          console.log("no match");
          break;
      }
    },
    changeStatus(status) {
      this.serviceStatusBloss = status.bloss;
      this.serviceStatusGeth = status.geth;
      this.serviceStatusIPFS = status.ipfs;
    },
    getDate() {
      return new Date();
    },
    startService(servicename) {
      // console.log('Starting '+servicename);
      this.$socket.emit("serviceControlRequest", {
        cmd: "start",
        service: servicename
      });
    },
    killService(servicename) {
      // console.log('Killing '+servicename);
      this.$socket.emit("serviceControlRequest", {
        cmd: "stop",
        service: servicename
      });
    },
    showDetails(attackReportId) {
      console.log("ShowDetails for _id " + attackReportId + " called");
      this.detailAttackReportIndex = this.mitigationRequests.findIndex(
        item => item._id === attackReportId
      );
      // console.log("detailAttackReportIndex" + this.detailAttackReportIndex);
      this.detailAttackReport = this.mitigationRequests[
        this.detailAttackReportIndex
      ];
      // console.log("detailAttackReport" + this.detailAttackReport);
      // console.log("ShowDetails for key:" + attackReportId);
      // console.log("detailAttackReportIndex" + this.detailAttackReportIndex);
      this.isAttackReportModalActive = true;
    },
    showAlarmDetails(attackReportId){
      this.detailAlarmReportIndex = this.requestMitigations.findIndex(
        item => item._id === attackReportId
      );
       // console.log("detailAttackReportIndex" + this.detailAttackReportIndex);
      this.detailAlarmReport = this.requestMitigations[
        this.detailAlarmReportIndex
      ];
      // console.log("detailAttackReport" + this.detailAttackReport);
      // console.log("ShowDetails for key:" + attackReportId);
      // console.log("detailAttackReportIndex" + this.detailAttackReportIndex);
      this.isAlarmReportModalActive = true;
    },
    
    acceptMREQ(attackReportId) {
      if (this.isAttackReportModalActive) {
        // Coming from detail overview
        console.log("Accepting MREQ:" + this.detailAttackReport._id);
        this.$socket.emit("responseMREQ", {
          action: constants.MITIGATION_REQ_ACCEPTED,
          _id: this.detailAttackReport._id
        });
        this.isAttackReportModalActive = false;
        // Remove the MREQ from the local array
        var currentMREQIndexDetail = this.mitigationRequests.findIndex(
          item => item._id === this.detailAttackReport._id
        );
        if (currentMREQIndexDetail > -1) {
          this.mitigationRequests.splice(currentMREQIndexDetail, 1);
        }
        // We receive the new MREQ when it's updated on server side
      } else {
        // Coming from Home screen
        console.log("Accepting MREQ:" + attackReportId);
        this.$socket.emit("responseMREQ", {
          action: constants.MITIGATION_REQ_ACCEPTED,
          _id: attackReportId
        });
        // Remove the MREQ from the local array
        var currentMREQIndex = this.mitigationRequests.findIndex(
          item => item._id === attackReportId
        );
        if (currentMREQIndex > -1) {
          this.mitigationRequests.splice(currentMREQIndex, 1);
        }
        // We receive the new MREQ when it's updated on server side
      }
    },
    declineMREQ(attackReportId) {
      if (this.isAttackReportModalActive) {
        // Coming from detail overview
        console.log("Declining MREQ:" + this.detailAttackReport._id);
        this.$socket.emit("responseMREQ", {
          action: constants.MITIGATION_REQ_DECLINED,
          _id: this.detailAttackReport._id
        });
        this.isAttackReportModalActive = false;
        // Remove the MREQ from the local array
        var currentMREQIndexDetail = this.mitigationRequests.findIndex(
          item => item._id === this.detailAttackReport._id
        );
        if (currentMREQIndexDetail > -1) {
          this.mitigationRequests.splice(currentMREQIndexDetail, 1);
        }
      } else {
        // Coming from Home screen
        console.log("Declining MREQ:" + attackReportId);
        this.$socket.emit("responseMREQ", {
          action: constants.MITIGATION_REQ_DECLINED,
          _id: attackReportId
        });
        // Remove the MREQ from the local array
        var currentMREQIndex = this.mitigationRequests.findIndex(
          item => item._id === attackReportId
        );
        if (currentMREQIndex > -1) {
          this.mitigationRequests.splice(currentMREQIndex, 1);
        }
        // We receive the new MREQ when it's updated on server side
      }
    },
    ignoreAlarm(alarmId) {
      // Coming from Home screen
      console.log("Ignoring Alarm:" + alarmId);
      this.$socket.emit("alarmResponse", {
        action: constants.ALARM_IGNORED,
        _id: alarmId
      });
      // Remove the MREQ from the local array
      var currentAlarmIndex = this.requestMitigations.findIndex(
        item => item._id === alarmId
      );
      if (currentAlarmIndex > -1) {
        this.requestMitigations.splice(currentAlarmIndex, 1);
      }
    },
    requestMitigation(alarmId) {
    if (this.isAlarmReportModalActive) {
      // Coming from detail overview
    console.log("Requesting Mitigation Alarm:" + detailAlarmReport._id);
        this.$socket.emit("alarmResponse", {
      action: constants.REQ_MITIGATION_REQUESTED,
          _id: this.detailAlarmReport._id
        });
        this.isAlarmReportModalActive = false;
        // Remove the MREQ from the local array
        var currentAlarmIndex = this.requestMitigations.findIndex(
          item => item._id === this.detailAlarmReport._id
        );
        if (currentAlarmIndex > -1) {
          this.requestMitigations.splice(currentAlarmIndex, 1);
        }
      }else{
    // Coming from Home screen
    console.log("Requesting Mitigation Alarm:" + alarmId);
    this.$socket.emit("alarmResponse", {
      action: constants.REQ_MITIGATION_REQUESTED,
      _id: alarmId
    });
    // Remove the MREQ from the local array
    var currentAlarmIndex = this.requestMitigations.findIndex(
      item => item._id === alarmId
    );
    if (currentAlarmIndex > -1) {
      this.requestMitigations.splice(currentAlarmIndex, 1);
    }}
  
    },
    displayToast(status, duration, style) {
      this.$toast.open({
        duration: duration,
        message: status,
        position: "is-top",
        type: style
      });
    },
    attackNotificationArrived() {
      this.$toast.open({
        duration: 2000,
        message: `A node is under attack`,
        position: "is-top",
        type: "is-alarm"
      });
    }
  },
  name: "home",
  components: {
    "mitigation-request": MitigationRequest,
    "attack-alarm": AttackAlarm
  }
};
</script>

<style>
.col-title {
  font-family: "Source Code Pro Bold";
  font-size: 1rem;
}
.section {
  font-family: "Source Code Pro Regular";
}

.el-container {
  padding: 0.1em;
}

.el-header,
.el-footer {
  background-color: #e0e0e0;
}

.el-main {
  background-color: #f5f5f5;
}

.dark-button {
  background-color: #e0e0e0;
}

.text {
  font-size: 10px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 480px;
}
</style>
<style lang="scss">
@import "../style/style";

span {
  margin-left: 0.25em;
  margin-right: 0.25em;
}
</style>
