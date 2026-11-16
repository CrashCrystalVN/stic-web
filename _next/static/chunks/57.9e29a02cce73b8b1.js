"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[57],{5236:function(e,t,s){s.d(t,{C6:function(){return i.C6},Mq:function(){return i.Mq},ZF:function(){return i.ZF}});var i=s(1480);/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(0,i.KN)("firebase","12.19.0","app")},9386:function(e,t,s){let i,r;s.d(t,{W2:function(){return Z},e5:function(){return Y},jW:function(){return K},j2:function(){return ee},Oh:function(){return et}});var n,a,o=s(1480),h=s(5980),c=s(9074),l=s(3693),u=s(357);let d="@firebase/data-connect",p="0.7.4",m="",b={OTHER:"other",ALREADY_INITIALIZED:"already-initialized",NOT_SUPPORTED:"not-supported",INVALID_ARGUMENT:"invalid-argument",PARTIAL_ERROR:"partial-error",UNAUTHORIZED:"unauthorized"};class f extends c.ZR{constructor(e,t){super(e,t),this.name="DataConnectError",Object.setPrototypeOf(this,f.prototype)}toString(){return`${this.name}[code=${this.code}]: ${this.message}`}}class g extends f{constructor(e,t){super(b.PARTIAL_ERROR,e),this.name="DataConnectOperationError",this.response=t}}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class v{getServerValue(e){return this.serverValues[e]}constructor(e){this.globalID=e,this.serverValues={},this.referencedFrom=new Set}getServerValues(){return this.serverValues}toJSON(){return{globalID:this.globalID,map:this.serverValues,referencedFrom:Array.from(this.referencedFrom)}}static fromJSON(e){let t=new v(e.globalID);return t.serverValues=e.map,t.referencedFrom=new Set(e.referencedFrom),t}updateServerValue(e,t,s){return this.serverValues[e]=t,this.referencedFrom.add(s),Array.from(this.referencedFrom)}}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class y{constructor(e){this._keyId=e,this.edos=new Map,this.resultTrees=new Map}async setResultTree(e,t){this.resultTrees.set(e,t)}async getResultTree(e){return this.resultTrees.get(e)}async updateEntityData(e){this.edos.set(e.globalID,e)}async getEntityData(e){return this.edos.has(e)||this.edos.set(e,new v(e)),this.edos.get(e)}close(){return Promise.resolve()}}class T{constructor(){this.scalars={},this.references={},this.objectLists={},this.entityDataKeys=new Set}async loadData(e,t,s,i,r){if(void 0!==t){if("object"!=typeof t||Array.isArray(t))throw new f(b.INVALID_ARGUMENT,"EntityNode initialized with non-object value");if(null!==t){for(let n in"object"==typeof t&&s&&s._id&&"string"==typeof s._id&&(this.globalId=s._id,this.entityData=await r.getEntityData(this.globalId)),t)if(t.hasOwnProperty(n)){if("object"==typeof t[n]){if(Array.isArray(t[n])){let a=s&&s[n],o=[],h=[];for(let[s,c]of t[n].entries())if("object"==typeof c){if(Array.isArray(c));else{let t=new T;await t.loadData(e,c,a&&a[s],i,r),o.push(t)}}else h.push(c);if(h.length>0&&o.length>0)this.scalars[n]=t[n];else if(h.length>0){if(this.entityData){let t=this.entityData.updateServerValue(n,h,e);this.entityDataKeys.add(n),i.add(t)}else this.scalars[n]=h}else o.length>0?this.objectLists[n]=o:this.scalars[n]=[]}else{if(null===t[n]){this.scalars[n]=null;continue}let a=new T;await a.loadData(e,t[n],s&&s[n],i,r),this.references[n]=a}}else if(this.entityData){let s=this.entityData.updateServerValue(n,t[n],e);this.entityDataKeys.add(n),i.add(s)}else this.scalars[n]=t[n]}this.entityData&&await r.updateEntityData(this.entityData)}}}toJSON(e){let t={};if(e===a.hydrated){if(this.entityData)for(let e of this.entityDataKeys)t[e]=this.entityData.getServerValue(e);if(this.scalars&&Object.assign(t,this.scalars),this.references)for(let s in this.references)this.references.hasOwnProperty(s)&&(t[s]=this.references[s].toJSON(e));if(this.objectLists)for(let s in this.objectLists)this.objectLists.hasOwnProperty(s)&&(t[s]=this.objectLists[s].map(t=>t.toJSON(e)))}else{if(this.entityData&&(t._id=this.entityData.globalID),t._entity_data_keys=Array.from(this.entityDataKeys),this.scalars&&(t._scalars=this.scalars),this.references){let s={};for(let t in this.references)this.references.hasOwnProperty(t)&&(s[t]=this.references[t].toJSON(e));t._references=s}if(this.objectLists){let s={};for(let t in this.objectLists)this.objectLists.hasOwnProperty(t)&&(s[t]=this.objectLists[t].map(t=>t.toJSON(e)));t._objectLists=s}}return t}static fromJson(e){let t=new T;if(e.backingData&&(t.entityData=v.fromJSON(e.backingData)),t.globalId=e.globalID,t.scalars=e.scalars,e.references){let s={};for(let t in e.references)e.references.hasOwnProperty(t)&&(s[t]=T.fromJson(e.references[t]));t.references=s}if(e.objectLists){let s={};for(let t in e.objectLists)e.objectLists.hasOwnProperty(t)&&(s[t]=e.objectLists[t].map(e=>T.fromJson(e)));t.objectLists=s}return t}}(n=a||(a={}))[n.hydrated=0]="hydrated",n[n.dehydrated=1]="dehydrated";/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class k{static fromJson(e){return new k(T.fromJson(e.rootStub),e.maxAge,e.cachedAt,e.lastAccessed)}constructor(e,t=0,s,i){this.rootStub=e,this.maxAge=t,this.cachedAt=s,this._lastAccessed=i}isStale(){return Date.now()-new Date(this.cachedAt.getTime()).getTime()>1e3*this.maxAge}updateMaxAge(e){this.maxAge=e}updateAccessed(){this._lastAccessed=new Date}get lastAccessed(){return this._lastAccessed}getRootStub(){return this.rootStub}}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class S{constructor(e){this.queryId=e,this.impacted=new Set}add(e){e.filter(e=>e!==this.queryId).forEach(e=>this.impacted.add(e))}consumeEvents(){let e=Array.from(this.impacted);return this.impacted.clear(),e}}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class R{hydrateResults(e){return e.toJSON(a.hydrated)}async dehydrateResults(e,t,s,i){let r=new S(i),n=new T;return await n.loadData(i,e,t,r,s),{entityNode:n,impacted:r.consumeEvents()}}}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class w{constructor(e,t,s,i,r){this.authProvider=e,this.projectId=t,this.connectorConfig=s,this.host=i,this.cacheSettings=r,this.cacheProvider=null,this.uid=null,this.authProvider.addTokenChangeListener(async e=>{let t=this.authProvider.getAuth().getUid();if(this.uid!==t){this.cacheProvider?.close(),this.uid=t;let e=await this.getIdentifier(this.uid);this.cacheProvider=this.initializeNewProviders(e)}})}async initialize(){if(!this.cacheProvider){let e=await this.getIdentifier(this.uid);this.cacheProvider=this.initializeNewProviders(e)}}async getIdentifier(e){let t=`memory-${this.projectId}-${this.connectorConfig.service}-${this.connectorConfig.connector}-${this.connectorConfig.location}-${e}-${this.host}`;return await (0,c.OH)(t)}initializeNewProviders(e){return this.cacheSettings.cacheProvider.initialize(e)}async containsResultTree(e){return await this.initialize(),void 0!==await this.cacheProvider.getResultTree(e)}async getResultTree(e){return await this.initialize(),this.cacheProvider.getResultTree(e)}async getResultJSON(e){await this.initialize();let t=new R,s=this.cacheProvider,i=await s.getResultTree(e);if(!i)throw new f(b.INVALID_ARGUMENT,`${e} not found in cache. Call "update()" first.`);return t.hydrateResults(i.getRootStub())}async update(e,t,s){await this.initialize();let i=new R,r=this.cacheProvider,{entityNode:n,impacted:a}=await i.dehydrateResults(t,s,r,e),o=new Date;return await r.setResultTree(e,new k(n,t.maxAge||this.cacheSettings.maxAgeSeconds,o,o)),a}}class _{constructor(){this.type="MEMORY"}initialize(e){return new y(e)}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class C{constructor(e,t){this.appCheckProvider=t,(0,o.rh)(e)&&e.settings.appCheckToken&&(this.serverAppAppCheckToken=e.settings.appCheckToken),this.appCheck=t?.getImmediate({optional:!0}),this.appCheck||t?.get().then(e=>this.appCheck=e).catch()}getToken(){return this.serverAppAppCheckToken?Promise.resolve({token:this.serverAppAppCheckToken}):this.appCheck?this.appCheck.getToken():new Promise((e,t)=>{setTimeout(()=>{this.appCheck?this.getToken().then(e,t):e(null)},0)})}addTokenChangeListener(e){this.appCheckProvider?.get().then(t=>t.addTokenListener(e))}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let I=new l.Yd("@firebase/data-connect");function A(e){I.debug(`DataConnect (${m}): ${e}`)}function E(e){I.error(`DataConnect (${m}): ${e}`)}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class O{constructor(e,t,s){this._appName=e,this._options=t,this._authProvider=s,this._auth=s.getImmediate({optional:!0}),this._auth||s.onInit(e=>this._auth=e)}getAuth(){return this._auth}getToken(e){return this._auth?this._auth.getToken(e).catch(e=>e&&"auth/token-not-initialized"===e.code?(A("Got auth/token-not-initialized error.  Treating as null token."),null):(E("Error received when attempting to retrieve token: "+JSON.stringify(e)),Promise.reject(e))):new Promise((t,s)=>{setTimeout(()=>{this._auth?this.getToken(e).then(t,s):t(null)},0)})}addTokenChangeListener(e){this._auth?.addAuthTokenListener(e)}removeTokenChangeListener(e){this._authProvider.get().then(t=>t.removeAuthTokenListener(e)).catch(e=>E(e))}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let q="query",P="SERVER",N="CACHE";function D(e){return Object.keys(e).sort().reduce((t,s)=>(t[s]=e[s],t),{})}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function M(e,t,s,i){return function(){return{data:t,refInfo:{name:e.name,variables:e.variables,connectorConfig:{projectId:e.dataConnect.app.options.projectId,...e.dataConnect.getSettings()}},fetchTime:i,source:s}}}i=e=>JSON.stringify(D(e)),r=e=>D(JSON.parse(e));class j{async preferCacheResults(e,t=!1){let s;try{s=await this.fetchCacheResults(e,t)}catch(e){}return s||this.fetchServerResults(e)}constructor(e,t,s){this.transport=e,this.dc=t,this.cache=s,this.callbacks=new Map,this.subscriptionCache=new Map,this.queue=[]}async waitForQueuedWrites(){for(let e of this.queue)await e;this.queue=[]}updateSSR(e){this.queue.push(this.updateCache(e).then(async t=>this.publishCacheResultsToSubscribers(t,e.fetchTime)))}async updateCache(e,t){if(await this.waitForQueuedWrites(),this.cache){let s=/**
 * @license
 * Copyright 2026 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function(e){let t=e.extensions?.dataConnect,s=Object.assign(e);if(!t)return s;let i={};for(let e of t){let{path:t}=e;!function(e,t,s){let i=t;for(let t of e)"object"!=typeof i[t]&&(i[t]={}),i=i[t];if("entityId"in s&&s.entityId)i._id=s.entityId;else if("entityIds"in s){let e=s.entityIds;for(let t=0;t<e.length;t++){let s=e[t];void 0===i[t]&&(i[t]={}),i[t]._id=s}}}(t,i,e)}return i}(e),r=function(e){if(e){for(let t of e)if("maxAge"in t&&void 0!==t.maxAge&&null!==t.maxAge&&t.maxAge.endsWith("s"))return Number(t.maxAge.substring(0,t.maxAge.length-1))}}(t);return void 0!==r&&(this.cache.cacheSettings.maxAgeSeconds=r),this.cache.update(i({name:e.ref.name,variables:e.ref.variables,refType:q}),e.data,s)}{let t=i({name:e.ref.name,variables:e.ref.variables,refType:q});return this.subscriptionCache.set(t,e),[t]}}addSubscription(e,t,s,r,n){let a=i({name:e.name,variables:e.variables,refType:q}),o=()=>{if(this.callbacks.has(a)){let t=this.callbacks.get(a).filter(e=>e!==h);this.callbacks.set(a,t),0===t.length&&(this.callbacks.delete(a),this.transport.invokeUnsubscribe(e.name,e.variables)),s?.()}},h={userCallback:t,errCallback:r,unsubscribe:o};return n&&this.updateSSR(n),this.preferCacheResults(e,!0).then(void 0,e=>{}),this.callbacks.has(a)?this.callbacks.get(a).push(h):(this.callbacks.set(a,[h]),this.transport.invokeSubscribe(this.makeSubscribeObserver(e),e.name,e.variables)),o}async fetchServerResults(e){await this.waitForQueuedWrites();let t=i({name:e.name,variables:e.variables,refType:q});try{let s=await this.transport.invokeQuery(e.name,e.variables),i=Date.now().toString(),r=s.extensions,n={...s,ref:e,source:P,fetchTime:i,data:s.data,extensions:U(r),toJSON:M(e,s.data,P,i)},a=await this.updateCache(n,r?.dataConnect);return this.publishDataToSubscribers(t,n),this.cache?await this.publishCacheResultsToSubscribers(a,i):this.subscriptionCache.set(t,n),n}catch(e){throw this.publishErrorToSubscribers(t,e),e}}async fetchCacheResults(e,t=!1){let s;if(await this.waitForQueuedWrites(),!(s=this.cache?await this.getFromResultTreeCache(e,t):await this.getFromSubscriberCache(e)))throw new f(b.OTHER,"No cache entry found for query: "+e.name);let r=Date.now().toString(),n={...s,ref:e,source:N,fetchTime:r,data:s.data,extensions:s.extensions,toJSON:M(e,s.data,N,r)};if(this.cache){let t=i({name:e.name,variables:e.variables,refType:q});await this.publishCacheResultsToSubscribers([t],r)}else{let t=i({name:e.name,variables:e.variables,refType:q});this.subscriptionCache.set(t,n),this.publishDataToSubscribers(t,n)}return n}publishErrorToSubscribers(e,t){this.callbacks.get(e)?.forEach(e=>{e.errCallback&&e.errCallback(t)})}async getFromResultTreeCache(e,t=!1){let s=i({name:e.name,variables:e.variables,refType:q});if(!this.cache||!await this.cache.containsResultTree(s))return null;let r=await this.cache.getResultJSON(s),n=await this.cache.getResultTree(s);if(!t&&n.isStale())return null;let a={source:N,ref:e,data:r,toJSON:M(e,r,N,n.cachedAt.toString()),fetchTime:n.cachedAt.toString()};return(await this.cache.getResultTree(s)).updateAccessed(),a}async getFromSubscriberCache(e){let t=i({name:e.name,variables:e.variables,refType:q});if(!this.subscriptionCache.has(t))return;let s=this.subscriptionCache.get(t);return s.source=N,s.toJSON=M(s.ref,s.data,N,s.fetchTime),s}publishDataToSubscribers(e,t){this.callbacks.has(e)&&this.callbacks.get(e).forEach(e=>{e.userCallback(t)})}async publishCacheResultsToSubscribers(e,t){if(this.cache)for(let s of e){if(!this.callbacks.get(s))continue;let e=(await this.cache.getResultTree(s)).getRootStub().toJSON(a.hydrated),{name:i,variables:n}=r(s),o={dataConnect:this.dc,refType:q,name:i,variables:n};this.publishDataToSubscribers(s,{data:e,fetchTime:t,ref:o,source:N,toJSON:M(o,e,N,t)})}}enableEmulator(e,t){this.transport.useEmulator(e,t)}makeSubscribeObserver(e){let t=i({name:e.name,variables:e.variables,refType:q});return{onData:async s=>{await this.handleStreamNotification(t,s,e)},onDisconnect:(e,s)=>{this.handleStreamDisconnect(t,e,s)},onError:e=>{this.publishErrorToSubscribers(t,e)}}}async handleStreamNotification(e,t,s){if(t.errors&&t.errors.length>0){let s=new g("DataConnect error received from subscribe notification: "+JSON.stringify(t.errors.map(e=>e&&"object"==typeof e?{message:e.message,code:e.code}:e)),{errors:t.errors,data:t.data});this.publishErrorToSubscribers(e,s);return}let i=Date.now().toString(),r={ref:s,source:P,fetchTime:i,data:t.data,extensions:U(t.extensions),toJSON:M(s,t.data,P,i)},n=await this.updateCache(r,t.extensions?.dataConnect);this.publishDataToSubscribers(e,r),this.cache&&await this.publishCacheResultsToSubscribers(n,i)}handleStreamDisconnect(e,t,s){let i=new f(t,s);this.publishErrorToSubscribers(e,i);let r=this.callbacks.get(e);r&&[...r].forEach(e=>e.unsubscribe())}}function U(e){return{dataConnect:e.dataConnect?.filter(e=>"entityId"in e||"entityIds"in e)}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let x={Base:"Base",Generated:"Generated"};class L{constructor(e,t,s,i,r,n,a=!1,o=x.Base){this.apiKey=t,this.appId=s,this.authProvider=i,this.appCheckProvider=r,this._isUsingGen=a,this._callerSdkType=o,this._host="",this._location="l",this._connectorName="",this._secure=!0,this._project="p",this._authToken=null,this._appCheckToken=null,this._lastToken=null,this._isUsingEmulator=!1,n&&("number"==typeof n.port&&(this._port=n.port),void 0!==n.sslEnabled&&(this._secure=n.sslEnabled),this._host=n.host);let{location:h,projectId:c,connector:l,service:u}=e;if(h&&(this._location=h),c&&(this._project=c),this._serviceName=u,!l)throw new f(b.INVALID_ARGUMENT,"Connector Name required!");this._connectorName=l,this._connectorResourcePath=`projects/${this._project}/locations/${this._location}/services/${this._serviceName}/connectors/${this._connectorName}`,this.authProvider?.addTokenChangeListener(e=>{A(`New Token Available: ${e}`),this.onAuthTokenChanged(e)}),this.appCheckProvider?.addTokenChangeListener(e=>{let{token:t}=e;A(`New App Check Token Available: ${t}`),this._appCheckToken=t})}useEmulator(e,t,s){this._host=e,this._isUsingEmulator=!0,"number"==typeof t&&(this._port=t),void 0!==s&&(this._secure=s)}async getWithAuth(e=!1){if(new Promise(e=>e(this._authToken)),this.appCheckProvider){let e=await this.appCheckProvider.getToken();e&&(this._appCheckToken=e.token)}return this.authProvider?this.authProvider.getToken(e).then(e=>e?(this._authToken=e.accessToken,this._authToken):null):new Promise(e=>e(""))}async withRetry(e,t=!1){let s=!1;return this.getWithAuth(t).then(e=>(s=this._lastToken!==e,this._lastToken=e,e)).then(e).catch(i=>{if("code"in i&&i.code===b.UNAUTHORIZED&&!t&&s)return A("Retrying due to unauthorized"),this.withRetry(e,!0);throw i})}_setLastToken(e){this._lastToken=e}_setCallerSdkType(e){this._callerSdkType=e}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let $=globalThis.fetch;async function F(e,t,{signal:s},i,r,n,a,o,h){var l;let u,d,p;if(!$)throw new f(b.OTHER,"No Fetch Implementation detected!");let v={"Content-Type":"application/json","X-Goog-Api-Client":(p="gl-js/ fire/"+m,o!==x.Base&&o!==x.Generated?p+=" js/"+o.toLowerCase():(a||o===x.Generated)&&(p+=" js/gen"),p),"X-Client-Version":`web/${m}`};r&&(v["X-Firebase-Auth-Token"]=r),i&&(v["x-firebase-gmpid"]=i),n&&(v["X-Firebase-AppCheck"]=n);let y={body:JSON.stringify(t),method:"POST",headers:v,signal:s};(0,c.Xx)(e)&&h&&(y.credentials="include");try{u=await $(e,y)}catch(t){let e=t&&"object"==typeof t&&"message"in t?t.message:String(t);throw new f(b.OTHER,"Failed to fetch: "+e)}try{d=await u.json()}catch(t){let e=t&&"object"==typeof t&&"message"in t?t.message:String(t);throw new f(b.OTHER,"Failed to parse JSON response: "+e)}let T="message"in(l=d)&&l.message?l.message:JSON.stringify(l);if(u.status>=400){if(E("Error while performing request: "+JSON.stringify(d)),401===u.status)throw new f(b.UNAUTHORIZED,T);throw new f(b.OTHER,T)}if(d.errors&&d.errors.length)throw new g("DataConnect error while performing request: "+JSON.stringify(d.errors),{errors:d.errors,data:d.data});return d.extensions||(d.extensions={dataConnect:[]}),d}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let J="firebasedataconnect.googleapis.com";function Q(e,t){if(!t)return e;let s=new URL(e);return s.searchParams.append("key",t),s.toString()}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class z extends L{constructor(e,t,s,i,r,n,a=!1,o=x.Base){super(e,t,s,i,r,n,a,o),this.invokeQuery=(e,t)=>{let s=new AbortController;return this.withRetry(()=>F(Q(`${this.endpointUrl}:executeQuery`,this.apiKey),{name:this._connectorResourcePath,operationName:e,variables:t},s,this.appId,this._authToken,this._appCheckToken,this._isUsingGen,this._callerSdkType,this._isUsingEmulator))},this.invokeMutation=(e,t)=>{let s=new AbortController;return this.withRetry(()=>F(Q(`${this.endpointUrl}:executeMutation`,this.apiKey),{name:this._connectorResourcePath,operationName:e,variables:t},s,this.appId,this._authToken,this._appCheckToken,this._isUsingGen,this._callerSdkType,this._isUsingEmulator))}}get endpointUrl(){return function(e,t){let{connector:s,location:i,projectId:r,service:n}=e,{host:a,sslEnabled:o,port:h}=t,c=a||J,l=`${o?"https":"http"}://${c}`;if("number"==typeof h)l+=`:${h}`;else if(void 0!==h)throw E("Port type is of an invalid type"),new f(b.INVALID_ARGUMENT,"Incorrect type for port passed in!");return`${l}/v1/projects/${r}/locations/${i}/services/${n}/connectors/${s}`}({connector:this._connectorName,location:this._location,projectId:this._project,service:this._serviceName},{host:this._host,sslEnabled:this._secure,port:this._port})}invokeSubscribe(e,t,s){throw new f(b.NOT_SUPPORTED,"Subscriptions are not supported using REST!")}invokeUnsubscribe(e,t){throw new f(b.NOT_SUPPORTED,"Unsubscriptions are not supported using REST!")}onAuthTokenChanged(e){this._authToken=e}}class V extends L{get isPendingClose(){return!!this.idleTimeout}get hasActiveSubscriptions(){return this.activeInvokeSubscribeRequests.size>0}get hasActiveExecuteRequests(){return this.activeInvokeQueryRequests.size>0||this.activeInvokeMutationRequests.size>0}constructor(e,t,s,i,r,n,a=!1,o=x.Base){super(e,t,s,i,r,n,a,o),this.apiKey=t,this.appId=s,this.authProvider=i,this.appCheckProvider=r,this._isUsingGen=a,this._callerSdkType=o,this.isUnableToConnect=!1,this.requestNumber=1,this.activeInvokeQueryRequests=new Map,this.queuedInvokeQueryRequests=new Map,this.activeInvokeMutationRequests=new Map,this.activeInvokeSubscribeRequests=new Map,this.executeRequestPromises=new Map,this.resumeRequestPromises=new Map,this.subscribeObservers=new Map,this.pendingCancellations=new Map,this.idleTimeout=null,this.hasWaitedForInitialAuth=!1,this.reconnectDelayMs=1e3,this.reconnectTimer=null,this.reconnectAttempts=0,this.removeOnlineEventListener=null,this.removeVisibilityChangeEventListener=null,this.onOnlineEventListener=()=>{this.reconnectTimer&&(this.cancelReconnect(),this.attemptReconnect())},this.onVisibilityChangeEventListener=()=>{let e=globalThis.document;e&&"visible"===e.visibilityState&&this.reconnectTimer&&(this.cancelReconnect(),this.attemptReconnect())},this.isFirstStreamMessage=!0,this.lastSentAuthToken=null,this.registerBrowserEventListeners()}registerBrowserEventListeners(){if("addEventListener"in globalThis){let e=this.onOnlineEventListener;globalThis.addEventListener("online",e),this.removeOnlineEventListener=()=>globalThis.removeEventListener("online",e)}let e=globalThis.document;if(e&&"addEventListener"in e){let t=this.onVisibilityChangeEventListener;e.addEventListener("visibilitychange",t),this.removeVisibilityChangeEventListener=()=>e.removeEventListener("visibilitychange",t)}}cleanupBrowserEventListeners(){this.removeVisibilityChangeEventListener?.(),this.removeVisibilityChangeEventListener=null,this.removeOnlineEventListener?.(),this.removeOnlineEventListener=null}async cleanupAndTerminate(e,t){this.cleanupBrowserEventListeners(),this.cancelReconnect(),this.cancelClose(),this.rejectAllRequests(e??b.OTHER,t??"Stream disposed."),await this.closeConnection(),this.onCloseCallback?.()}nextRequestId(){return(this.requestNumber++).toString()}trackInvokeMutationRequest(e,t,s){let i,r;let n={responsePromise:new Promise((e,t)=>{i=e,r=t}),resolveFn:i,rejectFn:r},a=this.activeInvokeMutationRequests.get(t)||[];return a.push(s),this.activeInvokeMutationRequests.set(t,a),this.executeRequestPromises.set(e,n),n}trackInvokeSubscribeRequest(e,t,s,i){this.activeInvokeSubscribeRequests.set(t,s),this.subscribeObservers.set(e,i)}cleanupInvokeQueryRequest(e,t){this.activeInvokeQueryRequests.delete(t),this.executeRequestPromises.delete(e),this.resumeRequestPromises.delete(e)}cleanupInvokeMutationRequest(e,t){let s=this.activeInvokeMutationRequests.get(t);if(s){let i=s.filter(t=>t.requestId!==e);i.length>0?this.activeInvokeMutationRequests.set(t,i):this.activeInvokeMutationRequests.delete(t)}this.executeRequestPromises.delete(e)}cleanupInvokeSubscribeRequest(e,t){this.activeInvokeSubscribeRequests.delete(t),this.subscribeObservers.delete(e)}cancelReconnect(){this.reconnectTimer&&(clearTimeout(this.reconnectTimer),this.reconnectTimer=null)}startReconnectBackoff(){if(this.reconnectTimer)return;this.reconnectAttempts++;let e=this.reconnectDelayMs;this.reconnectDelayMs=Math.min(1.5*this.reconnectDelayMs,6e4),this.reconnectTimer=setTimeout(()=>{this.reconnectTimer=null,this.attemptReconnect()},e+(Math.random()-.5)*e)}async attemptReconnect(){try{await this.ensureConnection(),this.reconnectDelayMs=1e3,this.reconnectAttempts=0,await this.retriggerActiveRequests()}catch(e){e instanceof c.ZR?(A(`Reconnect attempt #${this.reconnectAttempts} failed with Firebase error: ${e.message}. Retrying...`),this.startReconnectBackoff()):(E(`Unexpected error during reconnect attempt #${this.reconnectAttempts}: ${e}`),this.cleanupAndTerminate(b.OTHER,`Unexpected error during reconnect attempt #${this.reconnectAttempts}: ${e}`))}}async retriggerActiveRequests(){for(let[e,t]of this.activeInvokeSubscribeRequests)await this.sendRequestMessage(t);for(let[e,t]of this.activeInvokeQueryRequests)await this.sendRequestMessage(t)}get shouldIncludeAuth(){return this.isFirstStreamMessage||!!this._authToken&&this._authToken!==this.lastSentAuthToken}onConnectionReady(){this.isFirstStreamMessage=!0,this.lastSentAuthToken=null,this.hasWaitedForInitialAuth=!1}startIdleCloseTimeout(){this.idleTimeout||(this.idleTimeout=setTimeout(()=>{this.idleTimeout=null,this.hasActiveSubscriptions||this.hasActiveExecuteRequests||this.cleanupAndTerminate(b.OTHER,"Stream closed due to idleness.")},15e3))}cancelClose(){this.idleTimeout&&(clearTimeout(this.idleTimeout),this.idleTimeout=null)}rejectAllRequests(e,t){this.activeInvokeQueryRequests.clear(),this.activeInvokeMutationRequests.clear(),this.activeInvokeSubscribeRequests.clear();let s=new f(e,t);for(let[e,{rejectFn:t}]of this.queuedInvokeQueryRequests)this.queuedInvokeQueryRequests.delete(e),t(s);for(let[e,{rejectFn:t}]of this.executeRequestPromises)this.executeRequestPromises.delete(e),t(s);for(let[e,{rejectFn:t}]of this.resumeRequestPromises)this.resumeRequestPromises.delete(e),t(s);for(let[s,i]of this.subscribeObservers)this.subscribeObservers.delete(s),i.onDisconnect(e,t);this.pendingCancellations.clear(),this.cancelReconnect()}rejectAllMutationsOnReconnect(){let e=new f(b.OTHER,"Mutation aborted due to stream disconnect.");for(let[t,s]of this.activeInvokeMutationRequests)for(let t of s){let s=this.executeRequestPromises.get(t.requestId);s&&(s.rejectFn(e),this.executeRequestPromises.delete(t.requestId))}this.activeInvokeMutationRequests.clear()}onStreamClose(e,t){if(this.cancelClose(),!this.hasActiveSubscriptions){this.cleanupAndTerminate(b.OTHER,`Stream disconnected while idle with code ${e}: ${t}`);return}A(`Stream disconnected with code ${e}: ${t}. Attempting reconnect...`),this.rejectAllMutationsOnReconnect(),this.startReconnectBackoff()}prepareMessage(e){var t,s;let i;let r={...e},n={};return this.appId&&(n["x-firebase-gmpid"]=this.appId),n["X-Goog-Api-Client"]=(t=this._isUsingGen,s=this._callerSdkType,i="gl-js/ fire/"+m,s!==x.Base&&s!==x.Generated?i+=" js/"+s.toLowerCase():(t||s===x.Generated)&&(i+=" js/gen"),i),this.shouldIncludeAuth&&this._authToken&&(n["X-Firebase-Auth-Token"]=this._authToken,this.lastSentAuthToken=this._authToken),this.isFirstStreamMessage&&(n["X-Client-Version"]=`web/${m}`,this._appCheckToken&&(n["X-Firebase-AppCheck"]=this._appCheckToken),r.name=this._connectorResourcePath),r.headers=n,this.isFirstStreamMessage=!1,r}async sendRequestMessage(e){if(!this.hasWaitedForInitialAuth&&this.authProvider&&(await this.getWithAuth(),this.hasWaitedForInitialAuth=!0),this.streamIsReady){let t=this.prepareMessage(e);return this.sendMessage(t)}return this.ensureConnection().then(()=>{let t=this.prepareMessage(e);return this.sendMessage(t)})}getMapKey(e,t){return JSON.stringify({operationName:e,variables:this.sortObjectKeys(t)})}sortObjectKeys(e){if(null===e||"object"!=typeof e||Array.isArray(e))return e;let t={};return Object.keys(e).sort().forEach(s=>{t[s]=this.sortObjectKeys(e[s])}),t}invokeQuery(e,t){let s=this.getMapKey(e,t);return this.activeInvokeQueryRequests.has(s)?this.queueInvokeQueryRequest(s):this.executeOrResumeQuery(e,t,s)}queueInvokeQueryRequest(e){let t,s;let i=this.queuedInvokeQueryRequests.get(e);if(i)return i.responsePromise;let r=new Promise((e,i)=>{t=e,s=i});return this.queuedInvokeQueryRequests.set(e,{responsePromise:r,resolveFn:t,rejectFn:s}),r}executeOrResumeQuery(e,t,s,i){let r,n,a,o,h;let c=this.activeInvokeSubscribeRequests.get(s);return i?(r=i.resolveFn,n=i.rejectFn,a=i.responsePromise):a=new Promise((e,t)=>{r=e,n=t}),c?(h={requestId:o=c.requestId,resume:{}},this.resumeRequestPromises.set(o,{responsePromise:a,resolveFn:r,rejectFn:n})):(h={requestId:o=this.nextRequestId(),execute:{operationName:e,variables:t}},this.executeRequestPromises.set(o,{responsePromise:a,resolveFn:r,rejectFn:n})),this.activeInvokeQueryRequests.set(s,h),a=a.finally(()=>{this.onInvokeQueryRequestFulfilled(e,t,s,o)}),this.sendRequestMessage(h).catch(e=>{n(e)}),a}onInvokeQueryRequestFulfilled(e,t,s,i){this.cleanupInvokeQueryRequest(i,s),this.pendingCancellations.get(i)&&(this.pendingCancellations.delete(i),this.cancelSubscription(i,s));let r=this.queuedInvokeQueryRequests.get(s);if(!r){this.hasActiveSubscriptions||this.hasActiveExecuteRequests||this.startIdleCloseTimeout();return}this.queuedInvokeQueryRequests.delete(s),this.executeOrResumeQuery(e,t,s,r)}invokeMutation(e,t){let s=this.nextRequestId(),i=this.getMapKey(e,t),r={requestId:s,execute:{operationName:e,variables:t}},{responsePromise:n,rejectFn:a}=this.trackInvokeMutationRequest(s,i,r);return n=n.finally(()=>{this.cleanupInvokeMutationRequest(s,i),this.hasActiveSubscriptions||this.hasActiveExecuteRequests||this.startIdleCloseTimeout()}),this.sendRequestMessage(r).catch(e=>{a(e)}),n}invokeSubscribe(e,t,s){let i=this.getMapKey(t,s),r=this.activeInvokeSubscribeRequests.get(i);if(r){let t=r.requestId;this.pendingCancellations.has(t)&&(this.pendingCancellations.delete(t),this.subscribeObservers.set(t,e))}else{let r=this.nextRequestId(),n={requestId:r,subscribe:{operationName:t,variables:s}};this.trackInvokeSubscribeRequest(r,i,n,e),this.sendRequestMessage(n).catch(t=>{e.onError(t instanceof Error?t:Error(String(t))),this.cleanupInvokeSubscribeRequest(r,i),this.hasActiveSubscriptions||this.startIdleCloseTimeout()})}this.cancelClose()}invokeUnsubscribe(e,t){let s=this.getMapKey(e,t),i=this.activeInvokeSubscribeRequests.get(s);if(!i)return;let r=i.requestId;if(this.subscribeObservers.delete(r),this.resumeRequestPromises.get(r)){this.pendingCancellations.set(r,{operationName:e,variables:t});return}this.cancelSubscription(r,s)}cancelSubscription(e,t){this.cleanupInvokeSubscribeRequest(e,t),this.sendRequestMessage({requestId:e,cancel:{}}).catch(e=>{E(`Stream Transport failed to send unsubscribe message: ${e}`)}),this.hasActiveSubscriptions||this.startIdleCloseTimeout()}onAuthTokenChanged(e){let t=this._authToken;this._authToken=e;let s=this.authUid,i=this.authProvider?.getAuth()?.getUid();this.authUid=i,void 0!==s&&(t&&null===e||!s&&i||s&&i!==s)&&this.cleanupAndTerminate(b.UNAUTHORIZED,"Stream disconnected due to auth change.")}async handleResponse(e,t){if(this.executeRequestPromises.has(e)){let{resolveFn:s,rejectFn:i}=this.executeRequestPromises.get(e);this.handleInvokeOperationResponse(s,i,t)}else if(this.subscribeObservers.has(e)||this.resumeRequestPromises.has(e)){let s=this.subscribeObservers.get(e),i=this.resumeRequestPromises.get(e);if(i){this.resumeRequestPromises.delete(e);let{resolveFn:s,rejectFn:r}=i;this.handleInvokeOperationResponse(s,r,t)}if(s)try{await s.onData(t)}catch(e){E(`Error in observer callback: ${e}`)}}else E(`Stream response contained unrecognized requestId '${e}'`)}handleInvokeOperationResponse(e,t,s){if(s.errors&&s.errors.length){let e={errors:s.errors,data:s.data};t(new g("DataConnect error while performing request: "+JSON.stringify(s.errors),e))}else e(s)}}/**
 * @license
 * Copyright 2026 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let G=globalThis.WebSocket;class W extends V{constructor(){super(...arguments),this.decoder=void 0,this.connection=void 0,this.connectionAttempt=null}get endpointUrl(){return function(e,t){let{location:s,projectId:i,service:r}=e,{host:n,sslEnabled:a,port:o}=t,h=n||J,c=`${a?"wss":"ws"}://${h}`;if("number"==typeof o)c+=`:${o}`;else if(void 0!==o)throw E("Port type is of an invalid type"),new f(b.INVALID_ARGUMENT,"Incorrect type for port passed in!");return`${c}/ws/google.firebase.dataconnect.v1.ConnectorStreamService.Connect/${i}/locations/${s}/services/${r}`}({connector:this._connectorName,location:this._location,projectId:this._project,service:this._serviceName},{host:this._host,sslEnabled:this._secure,port:this._port})}decodeBinaryResponse(e){return this.decoder||(this.decoder=new TextDecoder("utf-8")),this.decoder.decode(e)}get streamIsReady(){return this.connection?.readyState===WebSocket.OPEN}ensureConnection(){try{if(this.streamIsReady)return Promise.resolve();if(this.connectionAttempt)return this.connectionAttempt;return this.connectionAttempt=new Promise((e,t)=>{if(!G)throw new f(b.OTHER,"No WebSocket Implementation detected!");let s=new G(this.endpointUrl);this.connection=s,this.connection.binaryType="arraybuffer",s.onopen=()=>{this.isUnableToConnect=!1,this.onConnectionReady(),e()},s.onerror=e=>{this.connectionAttempt=null,this.isUnableToConnect=!0;let s=new f(b.OTHER,"Error using WebSocket connection, closing WebSocket");this.handleError(s),t(s)},s.onmessage=e=>this.handleWebSocketMessage(e).catch(async e=>{this.handleError(e)}),s.onclose=e=>this.handleWebsocketDisconnect(e)}),this.connectionAttempt}catch(e){throw this.handleError(e),e}}openConnection(){return this.ensureConnection().catch(e=>{throw new f(b.OTHER,`Failed to open connection: ${e}`)})}closeConnection(e,t){let s;if(!this.connection)return this.connectionAttempt=null,Promise.resolve();try{if(t){let s=new TextEncoder;if(s.encode(t).length<=123)this.connection.close(e,t);else{let i=new Uint8Array(123),{read:r}=s.encodeInto(t,i),n=t.substring(0,r);this.connection.close(e,n)}}else this.connection.close(e)}catch(e){s=e}finally{this.connection=void 0,this.connectionAttempt=null}return s?Promise.reject(s):Promise.resolve()}handleWebsocketDisconnect(e){this.connection=void 0,this.connectionAttempt=null,this.onStreamClose(e.code,e.reason)}handleError(e){E(`DataConnect WebSocket error, closing stream: ${e}`);let t=e?String(e):"Unknown Error";e instanceof f&&(t=e.message),this.closeConnection(1e3,t)}sendMessage(e){return this.ensureConnection().then(()=>{try{return this.connection.send(JSON.stringify(e)),Promise.resolve()}catch(e){throw this.handleError(e),new f(b.OTHER,`Failed to send message: ${String(e)}`)}})}async handleWebSocketMessage(e){let t=this.parseWebSocketData(e.data),s=t.requestId,i={data:t.data,errors:t.errors,extensions:t.extensions||{dataConnect:[]}};await this.handleResponse(s,i)}parseWebSocketData(e){let t,s;let i="string"==typeof e;try{t=i?JSON.parse(e):JSON.parse(this.decodeBinaryResponse(e))}catch(e){throw new f(b.OTHER,`Could not parse WebSocket message: ${e instanceof Error?e.message:String(e)}`)}if("object"!=typeof t||null===t)throw new f(b.OTHER,"WebSocket message is not an object");if(i){if(!("result"in t))throw new f(b.OTHER,"WebSocket message from emulator did not include result");if("object"!=typeof t.result||null===t.result)throw new f(b.OTHER,"WebSocket message result is not an object");s=t.result}else s=t;if(!("requestId"in s))throw new f(b.OTHER,"WebSocket message did not include requestId");return s}}/**
 * @license
 * Copyright 2026 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class H{constructor(e,t,s,i,r,n,a=!1,o){this.options=e,this.apiKey=t,this.appId=s,this.authProvider=i,this.appCheckProvider=r,this.transportOptions=n,this._isUsingGen=a,this._callerSdkType=o,this.isUsingEmulator=!1,this.restTransport=new z(e,t,s,i,r,n,a,o)}initStreamTransport(){return this.streamTransport||(this.streamTransport=new W(this.options,this.apiKey,this.appId,this.authProvider,this.appCheckProvider,this.transportOptions,this._isUsingGen,this._callerSdkType),this.isUsingEmulator&&this.transportOptions&&this.streamTransport.useEmulator(this.transportOptions.host,this.transportOptions.port,this.transportOptions.sslEnabled),this.streamTransport.onCloseCallback=()=>{this.streamTransport=void 0}),this.streamTransport}executeShouldUseStream(){return!!this.streamTransport&&!this.streamTransport.isPendingClose&&this.streamTransport.streamIsReady&&this.streamTransport.hasActiveSubscriptions&&!this.streamTransport.isUnableToConnect}invokeQuery(e,t){return this.executeShouldUseStream()?this.streamTransport.invokeQuery(e,t).catch(s=>{if(this.executeShouldUseStream())throw s;return this.restTransport.invokeQuery(e,t)}):this.restTransport.invokeQuery(e,t)}invokeMutation(e,t){return this.executeShouldUseStream()?this.streamTransport.invokeMutation(e,t).catch(s=>{if(this.executeShouldUseStream())throw s;return this.restTransport.invokeMutation(e,t)}):this.restTransport.invokeMutation(e,t)}invokeSubscribe(e,t,s){let i=this.initStreamTransport();if(i.isUnableToConnect)throw new f(b.OTHER,"Unable to connect streaming connection to server. Subscriptions are unavailable.");i.invokeSubscribe(e,t,s)}invokeUnsubscribe(e,t){this.streamTransport&&this.streamTransport.invokeUnsubscribe(e,t)}useEmulator(e,t,s){this.isUsingEmulator=!0,this.transportOptions={host:e,port:t,sslEnabled:s},this.restTransport.useEmulator(e,t,s),this.streamTransport&&this.streamTransport.useEmulator(e,t,s)}onAuthTokenChanged(e){this.restTransport.onAuthTokenChanged(e),this.streamTransport&&this.streamTransport.onAuthTokenChanged(e)}_setCallerSdkType(e){this._callerSdkType=e,this.restTransport._setCallerSdkType(e),this.streamTransport&&this.streamTransport._setCallerSdkType(e)}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function K(e,t,s){return e.setInitialized(),{dataConnect:e,name:t,refType:"mutation",variables:s}}class B{constructor(e){this._transport=e,this._inflight=[]}executeMutation(e){let t=this._transport.invokeMutation(e.name,e.variables),s=t.then(t=>({...t,source:P,ref:e,fetchTime:Date.now().toLocaleString()}));this._inflight.push(t);let i=()=>this._inflight=this._inflight.filter(e=>e!==t);return t.then(i,i),s}}class X{constructor(e,t,s,i){if(this.app=e,this.dataConnectOptions=t,this._authProvider=s,this._appCheckProvider=i,this.isEmulator=!1,this._initialized=!1,this._isUsingGeneratedSdk=!1,this._callerSdkType=x.Base,void 0!==u&&u.env){let e=u.env.FIREBASE_DATA_CONNECT_EMULATOR_HOST;e&&(A("Found custom host. Using emulator"),this.isEmulator=!0,this._transportOptions=function(e){let[t,s]=e.split("://"),[i,r]=s.split(":");return{host:i,port:Number(r),sslEnabled:"https"===t}}(e))}}getCache(){return this.cache}_useGeneratedSdk(){this._isUsingGeneratedSdk||(this._isUsingGeneratedSdk=!0)}_setCallerSdkType(e){this._callerSdkType=e,this._initialized&&this._transport._setCallerSdkType(e)}_delete(){return(0,o.wN)(this.app,"data-connect",JSON.stringify(this.getSettings())),Promise.resolve()}getSettings(){let e=JSON.parse(JSON.stringify(this.dataConnectOptions));return delete e.projectId,e}setCacheSettings(e){this._cacheSettings=e}setInitialized(){if(this._initialized)return;void 0===this._transportClass&&(A("transportClass not provided. Defaulting to DataConnectTransportManager."),this._transportClass=H),this._authTokenProvider=new O(this.app.name,this.app.options,this._authProvider);let e={connector:this.dataConnectOptions.connector,service:this.dataConnectOptions.service,location:this.dataConnectOptions.location};this._cacheSettings&&(this.cache=new w(this._authTokenProvider,this.app.options.projectId,e,this._transportOptions?.host||J,this._cacheSettings)),this._appCheckProvider&&(this._appCheckTokenProvider=new C(this.app,this._appCheckProvider)),this._transport=new this._transportClass(this.dataConnectOptions,this.app.options.apiKey,this.app.options.appId,this._authTokenProvider,this._appCheckTokenProvider,void 0,this._isUsingGeneratedSdk,this._callerSdkType),this._transportOptions&&this._transport.useEmulator(this._transportOptions.host,this._transportOptions.port,this._transportOptions.sslEnabled),this._queryManager=new j(this._transport,this,this.cache),this._mutationManager=new B(this._transport),this._initialized=!0}enableEmulator(e){var t;if(this._transportOptions&&this._initialized&&((t=this._transportOptions).host!==e.host||t.port!==e.port||t.sslEnabled!==e.sslEnabled))throw E("enableEmulator called after initialization"),new f(b.ALREADY_INITIALIZED,"DataConnect instance already initialized!");this._transportOptions=e,this.isEmulator=!0}}function Z(e,t,s){let i,r,n;"location"in e?(r=e,i=(0,o.Mq)(),n=t):(i=e,r=t,n=s),i&&0!==Object.keys(i).length||(i=(0,o.Mq)());let a=Object.fromEntries(Object.entries({...r,projectId:i.options.projectId}).sort()),h=(0,o.qX)(i,"data-connect"),c=JSON.stringify(a);if(h.isInitialized(c)){let e=h.getImmediate({identifier:c});if(Object.keys(h.getOptions(c)).length>0)return A("Re-using cached instance"),e}(function(e){if(!e)throw new f(b.INVALID_ARGUMENT,"DC Option Required");["connector","location","service"].forEach(t=>{if(null===e[t]||void 0===e[t])throw new f(b.INVALID_ARGUMENT,`${t} Required`)})})(r),A("Creating new DataConnect instance");let l=h.initialize({instanceIdentifier:c,options:Object.fromEntries(Object.entries({...a}).sort())});return n?.cacheSettings&&l.setCacheSettings(n.cacheSettings),l}function Y(){return new _}function ee(e,t,s,i){return e.setInitialized(),void 0!==i&&e._queryManager.updateSSR(i),{dataConnect:e,refType:q,name:t,variables:s}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function et(e,t,s,i){let r,n;if(t&&"enableEmulator"in t?(r=t,n=s):(r=Z(e),n=t),!r||!n&&i)throw new f(b.INVALID_ARGUMENT,"Variables required.");return{dc:r,vars:n}}m=o.Jn,(0,o.Xd)(new h.wA("data-connect",(e,{instanceIdentifier:t,options:s})=>{let i=e.getProvider("app").getImmediate(),r=e.getProvider("auth-internal"),n=e.getProvider("app-check-internal"),a=s;if(t&&(a={...JSON.parse(t),...a}),!i.options.projectId)throw new f(b.INVALID_ARGUMENT,"Project ID must be provided. Did you pass in a proper projectId to initializeApp?");return new X(i,{...a,projectId:i.options.projectId},r,n)},"PUBLIC").setMultipleInstances(!0)),(0,o.KN)(d,p,void 0),(0,o.KN)(d,p,"esm2020")}}]);