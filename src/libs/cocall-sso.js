/**
 * version:	 		    1.0
 * creatTime: 	 		2017.02.20
 * updateTime: 			2017.02.20
 * author:				gaoyuan
 * name:  				cocall-sso
 */
var CoCallSsoClient = function(value){
	　　// 指向实际可用的端口
	this.port = 12700;
	
	if (CoCallSsoClient.prototype.portLst == undefined) {
		// 轮询尝试的端口列表
		CoCallSsoClient.prototype.portLst = [12700, 12702, 12704, 12706, 12708];
	}
	
	// 在用户信息中加入uid并排序
	if (CoCallSsoClient.prototype.addUidAndSort == undefined) {
		CoCallSsoClient.prototype.addUidAndSort = function (accountList) {
			for (var i = 0; i < accountList.length; i++) {
				accountList[i].uid = accountList[i].jid.split("@")[0];
			}
			accountList.sort(function(a, b) {
				var x = a.username;
				var y = b.username;
				if (x < y) {
			        return -1;
			    } else if (x > y) {
			        return 1;
			    } else {
			        return 0;
			    }
			});
		}
	}

	// 轮询端口
	if (CoCallSsoClient.prototype.recurRequest == undefined) {
		CoCallSsoClient.prototype.recurRequest = function (index, urlSuffix, onError, port) {
            if (index >= this.portLst.length) {
                onError();
                return ;
            }
            // 端口可以是12700/12702/12704...以此类推
            // 本机IP 127.0.0.1有可能以后会用某个域名来代替
            this.port = this.portLst[index];
            if (port) {
            	this.port = port;
            	index = -1;
            }
            var url = "http://127.0.0.1:" + this.port + urlSuffix;

			var el = document.createElement('script');
            el.async = false;
            el.src = url;
//            el.onload = el.onreadystatechange = function() {
//            	// IE的 script 元素支持onreadystatechange事件，不支持onload事件。
//            	// FF的script 元素不支持onreadystatechange事件，只支持onload事件。
//            	if (!this.readyState || this.readyState=='loaded' || this.readyState=='complete') {
//            		console.log("ss");
//            	}
//            };
			var client = this;
            el.onerror = function() {
                client.recurRequest(index+1, urlSuffix, onError);
            };
            el.type = 'text/javascript';

            (document.getElementsByTagName('HEAD')[0] || document.body).appendChild(el);
        }
	}
	
	if (CoCallSsoClient.prototype.getAllLoginAccount == undefined) {
		/**
		 * sdfsadf
		 */
		CoCallSsoClient.prototype.getAllLoginAccount = function (paramObj) {
			CoCallSsoClient.prototype.callback = function(accountList) {
				CoCallSsoClient.prototype.addUidAndSort(accountList);
				paramObj.onSuccess(accountList);
			}
			this.recurRequest(0, "/sso_get_account?callback=CoCallSsoClient.prototype.callback", paramObj.onError);
		}
	}
	
	if (CoCallSsoClient.prototype.getOneLoginAccount == undefined) {
		CoCallSsoClient.prototype.getOneLoginAccount = function (paramObj) {
			CoCallSsoClient.prototype.callback = function(accountList) {
				CoCallSsoClient.prototype.addUidAndSort(accountList);
				paramObj.onSuccess(accountList[0]);
			}
			this.recurRequest(0, "/sso_get_account?callback=CoCallSsoClient.prototype.callback", paramObj.onError);
		}
	}
	
	if (CoCallSsoClient.prototype.getToken == undefined) {
		CoCallSsoClient.prototype.getToken = function (paramObj) {
			CoCallSsoClient.prototype.callback = paramObj.onSuccess;
			var urlSuffix = "/sso_get_token?userid=" + paramObj.uid
        	+ "&server=" + paramObj.server 
        	+ (paramObj.misid ? "&misid=" + paramObj.misid : "")
        	+ "&callback=CoCallSsoClient.prototype.callback";
			this.recurRequest(0, urlSuffix, paramObj.onError, this.port);
		}
	}
}
window.CoCallSsoClient = CoCallSsoClient;
export default CoCallSsoClient
