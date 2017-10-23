var solumaxSetting = angular
	.module('Solumax.Setting', [])
	.factory('SettingModel', function(
		$http) {

		var settingModel = {}

		var baseUrl = '/setting/api/setting/';

		settingModel.index = function(params) {
			return $http.get(baseUrl, {params: params})
		}

		settingModel.get = function(id) {
			return $http.get(baseUrl, id)
		}
		
		settingModel.store = function(setting) {
			return $http.post(baseUrl, setting)
		}
		
		settingModel.update = function(id, setting) {
			return $http.post(baseUrl + id, setting)
		}

		settingModel.delete = function(id) {
			return $http.delete(baseUrl + id)
		}

		
		return settingModel
	})
	.factory('ConfigModel', function(
		$http) {

		var configModel = {}

		var baseUrl = '/setting/api/config/';

		configModel.get = function(keyName) {
			return $http.get(baseUrl + keyName)
		}
		
		return configModel
	})