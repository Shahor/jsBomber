var Debug = {
	'levels' : {
		'warn' : true,
		'error' : true,
		'log' : true
	},
	'log' : function (msg) {
		if (this.levels.log)
		{	
			console.log('[Log] : ' + msg);
		}
	},	
	'error' : function (msg) { 
		if (this.levels.error)
		{
			console.error('[Error] : ' + msg);
		}
	},
	'warn' : function (msg) { 
		if (this.levels.warn)
		{
			console.warn('[Info] : ' + msg);
		}
	}
}

exports.mDebug = Debug;