"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const failHandle = (err) => {
    switch (err.data.code) {
        case 400:
            wx.hideToast();
            wx.showToast({
                title: err.data.message || '请求失败',
                icon: "none",
                duration: 2000
            });
            break;
        case 401:
            wx.hideToast();
            wx.redirectTo({ url: '/pages/login/login' });
            break;
        default:
            wx.showToast({
                title: '请求失败',
                icon: "none",
                duration: 2000
            });
            wx.hideToast();
            break;
    }
};
const successHandle = (res) => {
    switch (res.data.code) {
        case 200:
            wx.hideToast();
            break;
        case 400:
            wx.hideToast();
            wx.showToast({
                title: res.data.message || '请求成功',
                icon: "none",
                duration: 2000
            });
            break;
        case 401:
            wx.hideToast();
            wx.redirectTo({ url: '/pages/login/login' });
            break;
        default:
            wx.hideToast();
            break;
    }
};
class API {
    constructor() {
        this.HOST = 'https://testapi.021xzy.com/';
    }
    http(URL, type, option, authority) {
        let token = wx.getStorageSync('token');
        let _data = option.data || {};
        let _header = option.data || {};
        if (authority === 'authority') {
            _header = Object.assign({ Token: token }, _header);
        }
        wx.showToast({
            title: "加载中",
            icon: 'loading',
            duration: 9999
        });
        return new Promise((resolve, reject) => {
            wx.request({
                url: this.HOST + URL,
                method: type,
                data: _data,
                timeout: 5000,
                header: Object.assign({ 'content-type': 'application/json', 'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization', 'Access-Control-Allow-Method': 'GET, POST, OPTIONS', 'Access-Control-Allow-Origin': "*" }, _header),
                complete(e) {
                    if (e.statusCode === 200 && e.data.code === 200) {
                        successHandle(e);
                        resolve(e);
                    }
                    else {
                        failHandle(e);
                        reject(e);
                    }
                }
            });
        });
    }
    typeHandle(type) {
        let typeNumber;
        switch (type) {
            case 'community':
                typeNumber = 5;
                break;
            case 'village':
                typeNumber = 8;
                break;
            case 'unit':
                typeNumber = 6;
                break;
            case 'street':
                typeNumber = 7;
                break;
            default:
                typeNumber = 0;
                break;
        }
        return typeNumber;
    }
    getDate() {
        return new Date().toISOString().split('T')[0];
    }
    checkToken() {
        this.http(`/backend/api/checkToken`, 'GET', {}, 'authority');
    }
    login(username, password) {
        return this.http('/backend/api/login', "POST", { data: { user_name: username, pwd: password, type: 1 } });
    }
    getUnit(committee_id) {
        let data = committee_id ? { committee_ids: committee_id + '' } : {};
        return this.http(`/backend/api/checkArea`, "GET", { data: Object.assign({ type: 6 }, data) }, 'authority');
    }
    getStreet(name) {
        let data = name ? { name } : {};
        return this.http(`/backend/api/streetRoadList`, "GET", { data: Object.assign({}, data) }, 'authority');
    }
    getCommitte(committee_ids) {
        let id_string = '';
        let data = {};
        if (committee_ids) {
            committee_ids.forEach((e, i) => {
                if (i === 0) {
                    id_string = e + '';
                }
                else {
                    id_string = id_string + ',' + e;
                }
            });
        }
        if (id_string) {
            data = { committee_ids: id_string };
        }
        return this.http(`/backend/api/checkArea`, "GET", { data: Object.assign({ type: 4 }, data) }, 'authority');
    }
    getVillageCommitte(committee_ids) {
        let id_string = '';
        let data = {};
        if (committee_ids) {
            committee_ids.forEach((e, i) => {
                if (i === 0) {
                    id_string = e + '';
                }
                else {
                    id_string = id_string + ',' + e;
                }
            });
        }
        if (id_string) {
            data = { committee_ids: id_string };
        }
        return this.http(`/backend/api/checkArea`, "GET", { data: Object.assign({ type: 8 }, data) }, 'authority');
    }
    getComunity(committee_ids, subdistrict_id) {
        let id_string = '';
        committee_ids.forEach((e, i) => {
            if (i === 0) {
                id_string = e;
            }
            else {
                id_string = id_string + ',' + e;
            }
        });
        let data = {};
        data = subdistrict_id ? { subdistrict_id: subdistrict_id + '' } : {};
        return this.http(`/backend/api/checkArea`, "GET", { data: Object.assign({ type: 5, committee_ids: id_string }, data) }, 'authority');
    }
    getVillage(committee_ids, subdistrict_id) {
        let id_string = '';
        committee_ids.forEach((e, i) => {
            if (i === 0) {
                id_string = e;
            }
            else {
                id_string = id_string + ',' + e;
            }
        });
        let data = {};
        data = subdistrict_id ? { subdistrict_id: subdistrict_id + '' } : {};
        return this.http(`/backend/api/checkArea`, "GET", { data: Object.assign({ type: 5, committee_ids: id_string }, data) }, 'authority');
    }
    searchComunity(name) {
        return this.http(`/backend/api/checkArea`, "GET", { data: { type: 5, name: encodeURI(name) } }, 'authority');
    }
    searchVillage(name) {
        return this.http(`/backend/api/checkArea`, "GET", { data: { type: 5, name: encodeURI(name) } }, 'authority');
    }
    searchUnit(name) {
        return this.http(`/backend/api/checkArea`, "GET", { data: { type: 6, name: encodeURI(name) } }, 'authority');
    }
    getComunityPenalties(subdistrict_id) {
        return this.http('/backend/api/deductPointsConfig', "GET", { data: { type: 5, subdistrict_id } }, 'authority');
    }
    getVillagePenalties(subdistrict_id) {
        return this.http('/backend/api/deductPointsConfig', "GET", { data: { type: 8, subdistrict_id } }, 'authority');
    }
    getStreetPenalties() {
        return this.http('/backend/api/deductPointsConfig', "GET", { data: { type: 7 } }, 'authority');
    }
    getUnitPenalties(committee_id) {
        return this.http('/backend/api/deductPointsConfig', "GET", { data: { type: 6, committee_id } }, 'authority');
    }
    saveCurrentPenalties(patrolData) {
        return new Promise((resolve) => {
            wx.setStorageSync('patrolData_' + patrolData.type, patrolData);
            resolve(true);
        });
    }
    getCurrentPenalties(type) {
        return new Promise((resolve) => {
            resolve(wx.getStorageSync('patrolData_' + type));
        });
    }
    upDecutComunity(data) {
        return this.http('/backend/api/deductPointsAction', "POST", { data: Object.assign({}, data, { type: 5 }) }, 'authority');
    }
    upDecutVillage(data) {
        return this.http('/backend/api/deductPointsAction', "POST", { data: Object.assign({}, data, { type: 8 }) }, 'authority');
    }
    upDecutUnit(data) {
        return this.http('/backend/api/deductPointsAction', "POST", { data: Object.assign({}, data, { type: 6 }) }, 'authority');
    }
    uploadFile(tempUrl) {
        return new Promise((resolve, reject) => {
            if (tempUrl.indexOf('https://img.hxjbcdn.com') > -1) {
                let data = {
                    data: JSON.stringify({ resultList: [{ access_url: tempUrl }] })
                };
                resolve(data);
                return;
            }
            wx.uploadFile({
                url: 'https://api.51jiabo.com/file/v2.0/uploadImage',
                filePath: tempUrl,
                name: 'file',
                timeout: 5000,
                header: {
                    'Token': wx.getStorageSync('token'),
                    'content-type': 'multipart/form-data',
                    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
                    'Access-Control-Allow-Method': 'GET, POST, OPTIONS',
                    'Access-Control-Allow-Origin': "*",
                },
                success(res) {
                    successHandle(res);
                    resolve(res);
                },
                fail(e) {
                    wx.showToast({
                        title: "上传图片失败",
                        icon: 'none',
                        duration: 2000
                    });
                    reject(e);
                }
            });
        });
    }
    uploadImgs(images) {
        return new Promise((resolve, reject) => {
            let index = 0;
            let last = images.length - 1;
            let picarr = [];
            wx.showLoading({ title: '上传中' });
            let up = () => {
                if (index <= last) {
                    this.uploadFile(images[index].url || images[index]).then((res) => {
                        picarr.push(JSON.parse(res.data).resultList[0].access_url);
                        index = index + 1;
                        up();
                    }, (err) => {
                        wx.hideLoading();
                        reject(err);
                    });
                }
                else {
                    wx.hideLoading();
                    resolve(picarr);
                }
            };
            up();
        });
    }
    getRecord(type) {
        let type2 = 0;
        type2 = this.typeHandle(type);
        return this.http(`/backend/api/UserPatrolList`, 'GET', { data: { type: type2 } }, "authority");
    }
    setPatrolType(type) {
        wx.setStorageSync('patrolType', type);
    }
    setRecordData(data) {
        wx.setStorageSync('recordData', data);
    }
    getCommunityList(upData) {
        let typeNumber = 0;
        typeNumber = this.typeHandle(upData.type);
        upData.type = typeNumber;
        upData.page = upData.page || 1;
        upData.pageSize = upData.pageSize || 10;
        return this.http('/information/api/areaList', "GET", { data: upData }, 'authority');
    }
    getCommunityDetail(upData) {
        return this.http('/backend/xcx/SubDistrictDetail', "GET", { data: upData }, 'authority');
    }
    getReportData(upData) {
        let typeNumber = 0;
        typeNumber = this.typeHandle(upData.type);
        upData.type = typeNumber;
        upData.page = upData.page || 1;
        upData.pageSize = upData.pageSize || 25;
        return this.http('/backend/api/patrolList', "GET", { data: upData }, 'authority');
    }
    getClassificationData() {
        return this.http('/backend/api/classification', "GET", {}, 'authority');
    }
    getPhoneNumber() {
        return this.http('/backend/api/checkUserMobile', "GET", {}, 'authority');
    }
    bindPhone(upData) {
        return this.http('/backend/api/bindMobile', "POST", { data: upData }, 'authority');
    }
    iptPhone(upData) {
        return this.http('/backend/api/bindMobileNew', "POST", { data: upData }, 'authority');
    }
    newAccount(data) {
        return this.http(`/backend/api/selfSaveRecord`, 'POST', { data: data }, 'authority');
    }
    newAccount2(data) {
        return this.http(`/backend/api/selfSaveRecord`, 'POST', { data: data }, 'authority');
    }
    newAccount3(data) {
        return this.http(`/backend/api/selfSaveRecord`, 'POST', { data: data }, 'authority');
    }
    getAnalysisData(type) {
        let typeNumber = 0;
        typeNumber = this.typeHandle(type);
        return this.http('/backend/api/analysisData', "GET", { data: { type: typeNumber } }, 'authority');
    }
    setFeedbackType(type) {
        wx.setStorageSync('feedbackType', type);
    }
    getPoints(type) {
        let typeNumber = 0;
        typeNumber = this.typeHandle(type);
        return this.http('/backend/xcx/rateData', "GET", { data: { type: typeNumber } }, 'authority');
    }
    getFeedbackList(upData) {
        let typeNumber = 0;
        let statusCode = 0;
        typeNumber = this.typeHandle(upData.type);
        switch (upData.status) {
            case 'all':
                statusCode = '';
                break;
            case 'pending':
                statusCode = 2;
                break;
            case 'notyet':
                statusCode = -1;
                break;
            case 'done':
                statusCode = 1;
                break;
            default:
                break;
        }
        upData.type = typeNumber;
        upData.pageSize = 10;
        upData.status = statusCode;
        console.log(upData);
        return this.http(`/backend/api/analysisList`, 'GET', { data: upData }, 'authority');
    }
    upFeedback(data) {
        return this.http('/backend/api/doActionFeedback', 'POST', { data: data }, 'authority');
    }
    newActivity(data) {
        return this.http(`/backend/api/activity/create`, 'POST', { data: data }, 'authority');
    }
    getSummary(type, page, size) {
        let typenumber = this.typeHandle(type);
        return this.http('/backend/xcx/questionRanking', 'GET', { data: { type: typenumber, page: page, pageSize: size } }, 'authority');
    }
    rectification(type) {
        let typenumber = this.typeHandle(type);
        return this.http('/backend/xcx/rectification', 'GET', { data: { type: typenumber } }, 'authority');
    }
    getRate(type) {
        let typenumber = this.typeHandle(type);
        return this.http('/backend/xcx/yield', 'GET', { data: { type: typenumber } }, 'authority');
    }
    getMap() {
        return new Promise((resolve, reject) => {
            this.http(`xcx/api/map`, 'GET', {}, 'authority').then((res) => {
                let outPut = [];
                let data = res.data.result;
                data.forEach((element, index) => {
                    let point = element.center.split(',');
                    let longitude = point[0];
                    let latitude = point[1];
                    outPut.push({
                        id: index,
                        width: 40,
                        height: 40,
                        latitude,
                        longitude,
                        iconPath: '/static/markerHome.png',
                        list: element.list,
                        customCallout: {
                            anchorY: 10,
                            anchorX: 10,
                            display: 'BYCLICK',
                        },
                    });
                });
                resolve(outPut);
            }, (err) => {
                reject(err);
            });
        });
    }
}
const api = new API;
exports.default = api;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmV0LnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJuZXQuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBLE1BQU0sVUFBVSxHQUFHLENBQUMsR0FBUSxFQUFFLEVBQUU7SUFDOUIsUUFBUSxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRTtRQUNyQixLQUFLLEdBQUc7WUFDTixFQUFFLENBQUMsU0FBUyxFQUFFLENBQUM7WUFDZixFQUFFLENBQUMsU0FBUyxDQUFDO2dCQUNYLEtBQUssRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sSUFBSSxNQUFNO2dCQUNqQyxJQUFJLEVBQUUsTUFBTTtnQkFDWixRQUFRLEVBQUUsSUFBSTthQUNmLENBQUMsQ0FBQTtZQUNGLE1BQU07UUFDUixLQUFLLEdBQUc7WUFDTixFQUFFLENBQUMsU0FBUyxFQUFFLENBQUM7WUFDZixFQUFFLENBQUMsVUFBVSxDQUFDLEVBQUUsR0FBRyxFQUFFLG9CQUFvQixFQUFFLENBQUMsQ0FBQTtZQUM1QyxNQUFNO1FBQ1I7WUFDRSxFQUFFLENBQUMsU0FBUyxDQUFDO2dCQUNYLEtBQUssRUFBRSxNQUFNO2dCQUNiLElBQUksRUFBRSxNQUFNO2dCQUNaLFFBQVEsRUFBRSxJQUFJO2FBQ2YsQ0FBQyxDQUFBO1lBQ0YsRUFBRSxDQUFDLFNBQVMsRUFBRSxDQUFDO1lBQ2YsTUFBTTtLQUNUO0FBQ0gsQ0FBQyxDQUFDO0FBQ0YsTUFBTSxhQUFhLEdBQUcsQ0FBQyxHQUFRLEVBQUUsRUFBRTtJQUNqQyxRQUFRLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFO1FBQ3JCLEtBQUssR0FBRztZQUNOLEVBQUUsQ0FBQyxTQUFTLEVBQUUsQ0FBQztZQUNmLE1BQU07UUFDUixLQUFLLEdBQUc7WUFDTixFQUFFLENBQUMsU0FBUyxFQUFFLENBQUM7WUFDZixFQUFFLENBQUMsU0FBUyxDQUFDO2dCQUNYLEtBQUssRUFBRSxHQUFHLENBQUMsSUFB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QUE7SUFDSixDQUFDO0NBQ0Y7QUFDRCxNQUFNLEdBQUcsR0FBRyxJQUFJLEdBQUcsQ0FBQTtBQUNuQixrQkFBZSxHQUFHLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBjb25zdCBhcGk6YW55ID0ge307XHJcblxyXG5jb25zdCBmYWlsSGFuZGxlID0gKGVycjogYW55KSA9PiB7XHJcbiAgc3dpdGNoIChlcnIuZGF0YS5jb2RlKSB7XHJcbiAgICBjYXNlIDQwMDpcclxuICAgICAgd3guaGlkZVRvYXN0KCk7XHJcbiAgICAgIHd4LnNob3dUb2FzdCh7XHJcbiAgICAgICAgdGl0bGU6IGVyci5kYXRhLm1lc3NhZ2UgfHwgJ+ivt+axguWksei0pScsXHJcbiAgICAgICAgaWNvbjogXCJub25lXCIsXHJcbiAgICAgICAgZHVyYXRpb246IDIwMDBcclxuICAgICAgfSlcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIDQwMTpcclxuICAgICAgd3guaGlkZVRvYXN0KCk7XHJcbiAgICAgIHd4LnJlZGlyZWN0VG8oeyB1cmw6ICcvcGFnZXMvbG9naW4vbG9naW4nIH0pXHJcbiAgICAgIGJyZWFrO1xyXG4gICAgZGVmYXVsdDpcclxuICAgICAgd3guc2hvd1RvYXN0KHtcclxuICAgICAgICB0aXRsZTogJ+ivt+axguWksei0pScsXHJcbiAgICAgICAgaWNvbjogXCJub25lXCIsXHJcbiAgICAgICAgZHVyYXRpb246IDIwMDBcclxuICAgICAgfSlcclxuICAgICAgd3guaGlkZVRvYXN0KCk7XHJcbiAgICAgIGJyZWFrO1xyXG4gIH1cclxufTtcclxuY29uc3Qgc3VjY2Vzc0hhbmRsZSA9IChyZXM6IGFueSkgPT4ge1xyXG4gIHN3aXRjaCAocmVzLmRhdGEuY29kZSkge1xyXG4gICAgY2FzZSAyMDA6XHJcbiAgICAgIHd4LmhpZGVUb2FzdCgpO1xyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgNDAwOlxyXG4gICAgICB3eC5oaWRlVG9hc3QoKTtcclxuICAgICAgd3guc2hvd1RvYXN0KHtcclxuICAgICAgICB0aXRsZTogcmVzLmRhdGEubWVzc2FnZSB8fCAn6K+35rGC5oiQ5YqfJyxcclxuICAgICAgICBpY29uOiBcIm5vbmVcIixcclxuICAgICAgICBkdXJhdGlvbjogMjAwMFxyXG4gICAgICB9KVxyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgNDAxOlxyXG4gICAgICB3eC5oaWRlVG9hc3QoKTtcclxuICAgICAgd3gucmVkaXJlY3RUbyh7IHVybDogJy9wYWdlcy9sb2dpbi9sb2dpbicgfSlcclxuICAgICAgYnJlYWs7XHJcbiAgICBkZWZhdWx0OlxyXG4gICAgICB3eC5oaWRlVG9hc3QoKTtcclxuICAgICAgYnJlYWs7XHJcbiAgfVxyXG59XHJcbmludGVyZmFjZSBwYXRyb2xEYXRhIHtcclxuICB0eXBlOiBtYWluVHlwZSxcclxuICBjb21taXR0ZWU/OiBbYW55XSxcclxuICB1bml0PzogW2FueV0sXHJcbiAgY29tbXVuaXR5PzogW2FueV0sXHJcbiAgdmlsbGFnZT86IFthbnldLFxyXG4gIHBlbmFsdGllczogYW55LFxyXG4gIHNfdW5pdD86IGFueSxcclxuICBzX2NvbW1pdHRlZT86IGFueSxcclxuICBzX2NvbW11bml0eT86IGFueVxyXG4gIHNfdmlsbGFnZT86IGFueVxyXG59XHJcblxyXG5leHBvcnQgdHlwZSBtYWluVHlwZSA9IFwiY29tbXVuaXR5XCIgfCBcInN0cmVldFwiIHwgXCJ1bml0XCIgfCBcInZpbGxhZ2VcIiB8IE51bWJlcjtcclxuXHJcbmNsYXNzIEFQSSB7XHJcbiAgLy8gcHJpdmF0ZSBIT1NUID0gJ2h0dHBzOi8vdGVzdGFwaS4wMjF4enkuY29tLyc7IC8vIOa1i+ivleeOr+WigzJcclxuICAvLyBwcml2YXRlIEhPU1QgPSAnaHR0cHM6Ly90aWNrZXQtYXBpLmppYS1leHBvLmNvbSc7IC8vIOa1i+ivleeOr+Wig1xyXG4gIHByaXZhdGUgSE9TVCA9ICdodHRwczovL2FwaS4wMjF4enkuY29tJyAvLyDmraPlvI/njq/looNcclxuICBwcml2YXRlIGh0dHAoVVJMOiBzdHJpbmcsIHR5cGU6IFwiT1BUSU9OU1wiIHwgXCJHRVRcIiB8IFwiSEVBRFwiIHwgXCJQT1NUXCIgfCBcIlBVVFwiIHwgXCJERUxFVEVcIiB8IFwiVFJBQ0VcIiB8IFwiQ09OTkVDVFwiIHwgdW5kZWZpbmVkLCBvcHRpb246IHsgZGF0YT86IGFueSwgaGVhZGVyPzogYW55IH0sIGF1dGhvcml0eT86ICdhdXRob3JpdHknKSB7XHJcbiAgICBsZXQgdG9rZW4gPSB3eC5nZXRTdG9yYWdlU3luYygndG9rZW4nKVxyXG4gICAgbGV0IF9kYXRhOiBhbnkgPSBvcHRpb24uZGF0YSB8fCB7fTtcclxuICAgIGxldCBfaGVhZGVyOiBhbnkgPSBvcHRpb24uZGF0YSB8fCB7fTtcclxuICAgIGlmIChhdXRob3JpdHkgPT09ICdhdXRob3JpdHknKSB7XHJcbiAgICAgIF9oZWFkZXIgPSB7IFRva2VuOiB0b2tlbiwgLi4uX2hlYWRlciB9XHJcbiAgICB9XHJcbiAgICB3eC5zaG93VG9hc3Qoe1xyXG4gICAgICB0aXRsZTogXCLliqDovb3kuK1cIixcclxuICAgICAgaWNvbjogJ2xvYWRpbmcnLFxyXG4gICAgICBkdXJhdGlvbjogOTk5OVxyXG4gICAgfSlcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgIHd4LnJlcXVlc3Qoe1xyXG4gICAgICAgIHVybDogdGhpcy5IT1NUICsgVVJMLFxyXG4gICAgICAgIG1ldGhvZDogdHlwZSxcclxuICAgICAgICBkYXRhOiBfZGF0YSxcclxuICAgICAgICB0aW1lb3V0OiA1MDAwLFxyXG4gICAgICAgIGhlYWRlcjoge1xyXG4gICAgICAgICAgJ2NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcclxuICAgICAgICAgICdBY2Nlc3MtQ29udHJvbC1BbGxvdy1IZWFkZXJzJzogJ09yaWdpbiwgWC1SZXF1ZXN0ZWQtV2l0aCwgQ29udGVudC1UeXBlLCBBY2NlcHQsIEF1dGhvcml6YXRpb24nLFxyXG4gICAgICAgICAgJ0FjY2Vzcy1Db250cm9sLUFsbG93LU1ldGhvZCc6ICdHRVQsIFBPU1QsIE9QVElPTlMnLFxyXG4gICAgICAgICAgJ0FjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpbic6IFwiKlwiLFxyXG4gICAgICAgICAgLi4uX2hlYWRlclxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY29tcGxldGUoZTogYW55KSB7XHJcbiAgICAgICAgICBpZiAoZS5zdGF0dXNDb2RlID09PSAyMDAgJiYgZS5kYXRhLmNvZGUgPT09IDIwMCkge1xyXG4gICAgICAgICAgICBzdWNjZXNzSGFuZGxlKGUpO1xyXG4gICAgICAgICAgICByZXNvbHZlKGUpO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZmFpbEhhbmRsZShlKTtcclxuICAgICAgICAgICAgcmVqZWN0KGUpXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgfSlcclxuICB9XHJcbiAgcHJpdmF0ZSB0eXBlSGFuZGxlKHR5cGU/OiBtYWluVHlwZXxzdHJpbmcpIHtcclxuICAgIGxldCB0eXBlTnVtYmVyXHJcbiAgICBzd2l0Y2ggKHR5cGUpIHtcclxuICAgICAgY2FzZSAnY29tbXVuaXR5JzpcclxuICAgICAgICB0eXBlTnVtYmVyID0gNVxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICd2aWxsYWdlJzpcclxuICAgICAgICB0eXBlTnVtYmVyID0gOFxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICd1bml0JzpcclxuICAgICAgICB0eXBlTnVtYmVyID0gNlxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICdzdHJlZXQnOlxyXG4gICAgICAgIHR5cGVOdW1iZXIgPSA3XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgdHlwZU51bWJlciA9IDA7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdHlwZU51bWJlclxyXG4gIH1cclxuICAvKipcclxuICAgKiBnZXREYXRlXHJcbiAgICovXHJcbiAgcHVibGljIGdldERhdGUoKSB7XHJcbiAgICByZXR1cm4gbmV3IERhdGUoKS50b0lTT1N0cmluZygpLnNwbGl0KCdUJylbMF1cclxuICB9XHJcbiAgY29uc3RydWN0b3IoKSB7IH1cclxuICBjaGVja1Rva2VuKCkge1xyXG4gICAgdGhpcy5odHRwKGAvYmFja2VuZC9hcGkvY2hlY2tUb2tlbmAsICdHRVQnLCB7fSwgJ2F1dGhvcml0eScpXHJcbiAgfVxyXG4gIGxvZ2luKHVzZXJuYW1lOiBzdHJpbmcsIHBhc3N3b3JkOiBzdHJpbmcpIHtcclxuICAgIHJldHVybiB0aGlzLmh0dHAoJy9iYWNrZW5kL2FwaS9sb2dpbicsIFwiUE9TVFwiLCB7IGRhdGE6IHsgdXNlcl9uYW1lOiB1c2VybmFtZSwgcHdkOiBwYXNzd29yZCwgdHlwZTogMSB9IH0pXHJcbiAgfVxyXG4gIC8qKlxyXG4gKiBnZXRVbml0XHJcbiAqIOiOt+WPluWNleS9jVxyXG4gKi9cclxuICBwdWJsaWMgZ2V0VW5pdChjb21taXR0ZWVfaWQ/OiBudW1iZXIgfCBzdHJpbmcpIHtcclxuICAgIGxldCBkYXRhID0gY29tbWl0dGVlX2lkID8geyBjb21taXR0ZWVfaWRzOiBjb21taXR0ZWVfaWQgKyAnJyB9IDoge31cclxuICAgIHJldHVybiB0aGlzLmh0dHAoYC9iYWNrZW5kL2FwaS9jaGVja0FyZWFgLCBcIkdFVFwiLCB7IGRhdGE6IHsgdHlwZTogNiwgLi4uZGF0YSB9IH0sICdhdXRob3JpdHknKVxyXG4gIH1cclxuICAvKipcclxuICAgKiBnZXRTdHJlZXRcclxuICAgKiDojrflj5booZfpgZPlt6Hmn6XliJfooahcclxuICAgKi9cclxuICBwdWJsaWMgZ2V0U3RyZWV0KG5hbWU/OiBzdHJpbmcpIHtcclxuICAgIGxldCBkYXRhID0gbmFtZSA/IHsgbmFtZSB9IDoge31cclxuICAgIHJldHVybiB0aGlzLmh0dHAoYC9iYWNrZW5kL2FwaS9zdHJlZXRSb2FkTGlzdGAsIFwiR0VUXCIsIHsgZGF0YTogeyAuLi5kYXRhIH0gfSwgJ2F1dGhvcml0eScpXHJcbiAgfVxyXG4gIC8vIOiOt+WPluWxheWnlFxyXG4gIGdldENvbW1pdHRlKGNvbW1pdHRlZV9pZHM/OiBbc3RyaW5nIHwgbnVtYmVyXSkge1xyXG4gICAgbGV0IGlkX3N0cmluZyA9ICcnXHJcbiAgICBsZXQgZGF0YSA9IHt9XHJcbiAgICBpZiAoY29tbWl0dGVlX2lkcykge1xyXG4gICAgICBjb21taXR0ZWVfaWRzLmZvckVhY2goKGUsIGkpID0+IHtcclxuICAgICAgICBpZiAoaSA9PT0gMCkge1xyXG4gICAgICAgICAgaWRfc3RyaW5nID0gZSArICcnXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGlkX3N0cmluZyA9IGlkX3N0cmluZyArICcsJyArIGVcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICB9XHJcbiAgICBpZiAoaWRfc3RyaW5nKSB7XHJcbiAgICAgIGRhdGEgPSB7IGNvbW1pdHRlZV9pZHM6IGlkX3N0cmluZyB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRoaXMuaHR0cChgL2JhY2tlbmQvYXBpL2NoZWNrQXJlYWAsIFwiR0VUXCIsIHsgZGF0YTogeyB0eXBlOiA0LCAuLi5kYXRhIH0gfSwgJ2F1dGhvcml0eScpXHJcbiAgfVxyXG4gIC8qKlxyXG4gICAqIOiOt+WPluadkeWnlFxyXG4gICAqL1xyXG4gIGdldFZpbGxhZ2VDb21taXR0ZShjb21taXR0ZWVfaWRzPzogW3N0cmluZyB8IG51bWJlcl0pIHtcclxuICAgIGxldCBpZF9zdHJpbmcgPSAnJ1xyXG4gICAgbGV0IGRhdGEgPSB7fVxyXG4gICAgaWYgKGNvbW1pdHRlZV9pZHMpIHtcclxuICAgICAgY29tbWl0dGVlX2lkcy5mb3JFYWNoKChlLCBpKSA9PiB7XHJcbiAgICAgICAgaWYgKGkgPT09IDApIHtcclxuICAgICAgICAgIGlkX3N0cmluZyA9IGUgKyAnJ1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBpZF9zdHJpbmcgPSBpZF9zdHJpbmcgKyAnLCcgKyBlXHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgfVxyXG4gICAgaWYgKGlkX3N0cmluZykge1xyXG4gICAgICBkYXRhID0geyBjb21taXR0ZWVfaWRzOiBpZF9zdHJpbmcgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRoaXMuaHR0cChgL2JhY2tlbmQvYXBpL2NoZWNrQXJlYWAsIFwiR0VUXCIsIHsgZGF0YTogeyB0eXBlOiA4LCAuLi5kYXRhIH0gfSwgJ2F1dGhvcml0eScpXHJcbiAgfVxyXG4gIGdldENvbXVuaXR5KGNvbW1pdHRlZV9pZHM6IFtzdHJpbmddLCBzdWJkaXN0cmljdF9pZD86IG51bWJlciB8IHN0cmluZykge1xyXG4gICAgLy8g6I635Y+W5bCP5Yy6XHJcbiAgICBsZXQgaWRfc3RyaW5nID0gJydcclxuICAgIGNvbW1pdHRlZV9pZHMuZm9yRWFjaCgoZSwgaSkgPT4ge1xyXG4gICAgICBpZiAoaSA9PT0gMCkge1xyXG4gICAgICAgIGlkX3N0cmluZyA9IGVcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBpZF9zdHJpbmcgPSBpZF9zdHJpbmcgKyAnLCcgKyBlXHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgICBsZXQgZGF0YSA9IHt9XHJcbiAgICBkYXRhID0gc3ViZGlzdHJpY3RfaWQgPyB7IHN1YmRpc3RyaWN0X2lkOiBzdWJkaXN0cmljdF9pZCArICcnIH0gOiB7fVxyXG4gICAgcmV0dXJuIHRoaXMuaHR0cChgL2JhY2tlbmQvYXBpL2NoZWNrQXJlYWAsIFwiR0VUXCIsIHsgZGF0YTogeyB0eXBlOiA1LCBjb21taXR0ZWVfaWRzOiBpZF9zdHJpbmcsIC4uLmRhdGEgfSB9LCAnYXV0aG9yaXR5JylcclxuICB9XHJcbiAgZ2V0VmlsbGFnZShjb21taXR0ZWVfaWRzOiBbc3RyaW5nXSwgc3ViZGlzdHJpY3RfaWQ/OiBudW1iZXIgfCBzdHJpbmcpIHtcclxuICAgIC8vIOiOt+WPluWwj+WMulxyXG4gICAgbGV0IGlkX3N0cmluZyA9ICcnXHJcbiAgICBjb21taXR0ZWVfaWRzLmZvckVhY2goKGUsIGkpID0+IHtcclxuICAgICAgaWYgKGkgPT09IDApIHtcclxuICAgICAgICBpZF9zdHJpbmcgPSBlXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaWRfc3RyaW5nID0gaWRfc3RyaW5nICsgJywnICsgZVxyXG4gICAgICB9XHJcbiAgICB9KVxyXG4gICAgbGV0IGRhdGEgPSB7fVxyXG4gICAgZGF0YSA9IHN1YmRpc3RyaWN0X2lkID8geyBzdWJkaXN0cmljdF9pZDogc3ViZGlzdHJpY3RfaWQgKyAnJyB9IDoge31cclxuICAgIHJldHVybiB0aGlzLmh0dHAoYC9iYWNrZW5kL2FwaS9jaGVja0FyZWFgLCBcIkdFVFwiLCB7IGRhdGE6IHsgdHlwZTogNSwgY29tbWl0dGVlX2lkczogaWRfc3RyaW5nLCAuLi5kYXRhIH0gfSwgJ2F1dGhvcml0eScpXHJcbiAgfVxyXG4gIC8vIOaQnOe0ouWwj+WMulxyXG4gIHNlYXJjaENvbXVuaXR5KG5hbWU6IHN0cmluZykge1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cChgL2JhY2tlbmQvYXBpL2NoZWNrQXJlYWAsIFwiR0VUXCIsIHsgZGF0YTogeyB0eXBlOiA1LCBuYW1lOiBlbmNvZGVVUkkobmFtZSkgfSB9LCAnYXV0aG9yaXR5JylcclxuICB9XHJcblxyXG4gIC8vIOaQnOe0ouihjOaUv+adkVxyXG4gIHNlYXJjaFZpbGxhZ2UobmFtZTogc3RyaW5nKSB7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwKGAvYmFja2VuZC9hcGkvY2hlY2tBcmVhYCwgXCJHRVRcIiwgeyBkYXRhOiB7IHR5cGU6IDUsIG5hbWU6IGVuY29kZVVSSShuYW1lKSB9IH0sICdhdXRob3JpdHknKVxyXG4gIH1cclxuICAvKipcclxuICAgKiBzZWFyY2hVbml0XHJcbiAgICog5pCc57Si5Y2V5L2NXHJcbiAgICovXHJcbiAgcHVibGljIHNlYXJjaFVuaXQobmFtZTogc3RyaW5nKSB7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwKGAvYmFja2VuZC9hcGkvY2hlY2tBcmVhYCwgXCJHRVRcIiwgeyBkYXRhOiB7IHR5cGU6IDYsIG5hbWU6IGVuY29kZVVSSShuYW1lKSB9IH0sICdhdXRob3JpdHknKVxyXG4gIH1cclxuICAvKipcclxuICAgKiBnZXRQZW5hbHRpZXNcclxuICAgKiDojrflj5blsI/ljLrmiaPliIbpoblcclxuICAgKi9cclxuICBwdWJsaWMgZ2V0Q29tdW5pdHlQZW5hbHRpZXMoc3ViZGlzdHJpY3RfaWQ6IG51bWJlciB8IHN0cmluZykge1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cCgnL2JhY2tlbmQvYXBpL2RlZHVjdFBvaW50c0NvbmZpZycsIFwiR0VUXCIsIHsgZGF0YTogeyB0eXBlOiA1LCBzdWJkaXN0cmljdF9pZCB9IH0sICdhdXRob3JpdHknKVxyXG4gIH1cclxuICAvKipcclxuICogZ2V0UGVuYWx0aWVzXHJcbiAqIOiOt+WPluihjOaUv+adkeaJo+WIhumhuVxyXG4gKi9cclxuICBwdWJsaWMgZ2V0VmlsbGFnZVBlbmFsdGllcyhzdWJkaXN0cmljdF9pZDogbnVtYmVyIHwgc3RyaW5nKSB7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwKCcvYmFja2VuZC9hcGkvZGVkdWN0UG9pbnRzQ29uZmlnJywgXCJHRVRcIiwgeyBkYXRhOiB7IHR5cGU6IDgsIHN1YmRpc3RyaWN0X2lkIH0gfSwgJ2F1dGhvcml0eScpXHJcbiAgfVxyXG4gIC8qKlxyXG4gICAqIGdldFN0cmVldFBlbmFsdGllc1xyXG4gICAqIOiOt+WPluayv+ihl+ihl+mBk+aJo+WIhumhuVxyXG4gICAqL1xyXG4gIHB1YmxpYyBnZXRTdHJlZXRQZW5hbHRpZXMoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwKCcvYmFja2VuZC9hcGkvZGVkdWN0UG9pbnRzQ29uZmlnJywgXCJHRVRcIiwgeyBkYXRhOiB7IHR5cGU6IDcgfSB9LCAnYXV0aG9yaXR5JylcclxuICB9XHJcbiAgLyoqXHJcbiAgICogZ2V0VW5pdFBlbmFsdGllc1xyXG4gICAqIOiOt+WPluWNleS9jemBk+aJo+WIhumhuVxyXG4gICAqL1xyXG4gIHB1YmxpYyBnZXRVbml0UGVuYWx0aWVzKGNvbW1pdHRlZV9pZDogbnVtYmVyIHwgc3RyaW5nKSB7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwKCcvYmFja2VuZC9hcGkvZGVkdWN0UG9pbnRzQ29uZmlnJywgXCJHRVRcIiwgeyBkYXRhOiB7IHR5cGU6IDYsIGNvbW1pdHRlZV9pZCB9IH0sICdhdXRob3JpdHknKVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogc2F2ZUN1cnJlbnRQZW5hbHRpZXNcclxuICAgKiDkv53lrZjlvZPliY3mraPlnKjlt6Hmn6XnmoTpobXpnaLnvJPlrZhcclxuICAgKi9cclxuICBwdWJsaWMgc2F2ZUN1cnJlbnRQZW5hbHRpZXMocGF0cm9sRGF0YTogcGF0cm9sRGF0YSkge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XHJcbiAgICAgIHd4LnNldFN0b3JhZ2VTeW5jKCdwYXRyb2xEYXRhXycgKyBwYXRyb2xEYXRhLnR5cGUsIHBhdHJvbERhdGEpO1xyXG4gICAgICByZXNvbHZlKHRydWUpXHJcbiAgICB9KVxyXG4gIH1cclxuICAvKipcclxuICAgKiBnZXRDdXJyZW50UGVuYWx0aWVzXHJcbiAgICog6I635Y+W5b2T5YmN5q2j5Zyo5beh5p+l55qE6aG16Z2i57yT5a2YXHJcbiAgICovXHJcbiAgcHVibGljIGdldEN1cnJlbnRQZW5hbHRpZXModHlwZTogc3RyaW5nKSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcclxuICAgICAgcmVzb2x2ZSh3eC5nZXRTdG9yYWdlU3luYygncGF0cm9sRGF0YV8nICsgdHlwZSkpXHJcbiAgICB9KVxyXG4gIH1cclxuICAvKipcclxuICAgKiB1cERlY3V0Q29tdW5pdHlcclxuICAgKiDkuIrkvKDnpL7ljLrmiZPliIZcclxuICAgKi9cclxuICBwdWJsaWMgdXBEZWN1dENvbXVuaXR5KGRhdGE6IGFueSkge1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cCgnL2JhY2tlbmQvYXBpL2RlZHVjdFBvaW50c0FjdGlvbicsIFwiUE9TVFwiLCB7IGRhdGE6IHsgLi4uZGF0YSwgdHlwZTogNSB9IH0sICdhdXRob3JpdHknKVxyXG4gIH1cclxuICAvKipcclxuICogdXBEZWN1dENvbXVuaXR5XHJcbiAqIOS4iuS8oOekvuWMuuaJk+WIhlxyXG4gKi9cclxuICBwdWJsaWMgdXBEZWN1dFZpbGxhZ2UoZGF0YTogYW55KSB7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwKCcvYmFja2VuZC9hcGkvZGVkdWN0UG9pbnRzQWN0aW9uJywgXCJQT1NUXCIsIHsgZGF0YTogeyAuLi5kYXRhLCB0eXBlOiA4IH0gfSwgJ2F1dGhvcml0eScpXHJcbiAgfVxyXG4gIC8qKlxyXG4gICAqIHVwRGVjdXRVbml0XHJcbiAgICog5LiK5Lyg5Y2V5L2N5omT5YiGXHJcbiAgICovXHJcbiAgcHVibGljIHVwRGVjdXRVbml0KGRhdGE6IGFueSkge1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cCgnL2JhY2tlbmQvYXBpL2RlZHVjdFBvaW50c0FjdGlvbicsIFwiUE9TVFwiLCB7IGRhdGE6IHsgLi4uZGF0YSwgdHlwZTogNiB9IH0sICdhdXRob3JpdHknKVxyXG4gIH1cclxuICAvKipcclxuICAgKiB1cGxvYWRGaWxlXHJcbiAgICog5b6u5L+h5LiK5Lyg5Zu+54mHXHJcbiAgICovXHJcbiAgcHVibGljIHVwbG9hZEZpbGUodGVtcFVybDogc3RyaW5nKSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICBpZiAodGVtcFVybC5pbmRleE9mKCdodHRwczovL2ltZy5oeGpiY2RuLmNvbScpID4gLTEpIHtcclxuICAgICAgICAvLyBKU09OLnBhcnNlKHJlcy5kYXRhKS5yZXN1bHRMaXN0WzBdLmFjY2Vzc191cmxcclxuICAgICAgICBsZXQgZGF0YSA9IHtcclxuICAgICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KHsgcmVzdWx0TGlzdDogW3sgYWNjZXNzX3VybDogdGVtcFVybCB9XSB9KVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXNvbHZlKGRhdGEpXHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcbiAgICAgIHd4LnVwbG9hZEZpbGUoe1xyXG4gICAgICAgIHVybDogJ2h0dHBzOi8vYXBpLjUxamlhYm8uY29tL2ZpbGUvdjIuMC91cGxvYWRJbWFnZScsIC8v5LuF5Li656S65L6L77yM6Z2e55yf5a6e55qE5o6l5Y+j5Zyw5Z2AXHJcbiAgICAgICAgZmlsZVBhdGg6IHRlbXBVcmwsXHJcbiAgICAgICAgbmFtZTogJ2ZpbGUnLFxyXG4gICAgICAgIHRpbWVvdXQ6IDUwMDAsXHJcbiAgICAgICAgaGVhZGVyOiB7XHJcbiAgICAgICAgICAnVG9rZW4nOiB3eC5nZXRTdG9yYWdlU3luYygndG9rZW4nKSxcclxuICAgICAgICAgICdjb250ZW50LXR5cGUnOiAnbXVsdGlwYXJ0L2Zvcm0tZGF0YScsXHJcbiAgICAgICAgICAnQWNjZXNzLUNvbnRyb2wtQWxsb3ctSGVhZGVycyc6ICdPcmlnaW4sIFgtUmVxdWVzdGVkLVdpdGgsIENvbnRlbnQtVHlwZSwgQWNjZXB0LCBBdXRob3JpemF0aW9uJyxcclxuICAgICAgICAgICdBY2Nlc3MtQ29udHJvbC1BbGxvdy1NZXRob2QnOiAnR0VULCBQT1NULCBPUFRJT05TJyxcclxuICAgICAgICAgICdBY2Nlc3MtQ29udHJvbC1BbGxvdy1PcmlnaW4nOiBcIipcIixcclxuICAgICAgICB9LFxyXG4gICAgICAgIHN1Y2Nlc3MocmVzKSB7XHJcbiAgICAgICAgICBzdWNjZXNzSGFuZGxlKHJlcyk7XHJcbiAgICAgICAgICByZXNvbHZlKHJlcylcclxuICAgICAgICB9LFxyXG4gICAgICAgIGZhaWwoZSkge1xyXG4gICAgICAgICAgd3guc2hvd1RvYXN0KHtcclxuICAgICAgICAgICAgdGl0bGU6IFwi5LiK5Lyg5Zu+54mH5aSx6LSlXCIsXHJcbiAgICAgICAgICAgIGljb246ICdub25lJyxcclxuICAgICAgICAgICAgZHVyYXRpb246IDIwMDBcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgcmVqZWN0KGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgIH0pXHJcbiAgfVxyXG5cclxuICBwdWJsaWMgdXBsb2FkSW1ncyhpbWFnZXM6IEFycmF5PGFueT4pIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgIGxldCBpbmRleCA9IDBcclxuICAgICAgbGV0IGxhc3QgPSBpbWFnZXMubGVuZ3RoIC0gMVxyXG4gICAgICBsZXQgcGljYXJyID0gPGFueT5bXVxyXG4gICAgICB3eC5zaG93TG9hZGluZyh7IHRpdGxlOiAn5LiK5Lyg5LitJyB9KVxyXG4gICAgICBsZXQgdXAgPSAoKSA9PiB7XHJcbiAgICAgICAgaWYgKGluZGV4IDw9IGxhc3QpIHtcclxuICAgICAgICAgIHRoaXMudXBsb2FkRmlsZShpbWFnZXNbaW5kZXhdLnVybCB8fCBpbWFnZXNbaW5kZXhdKS50aGVuKChyZXM6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICBwaWNhcnIucHVzaChKU09OLnBhcnNlKHJlcy5kYXRhKS5yZXN1bHRMaXN0WzBdLmFjY2Vzc191cmwpXHJcbiAgICAgICAgICAgIGluZGV4ID0gaW5kZXggKyAxXHJcbiAgICAgICAgICAgIHVwKCk7XHJcbiAgICAgICAgICB9LCAoZXJyOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgd3guaGlkZUxvYWRpbmcoKVxyXG4gICAgICAgICAgICByZWplY3QoZXJyKVxyXG4gICAgICAgICAgfSlcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgd3guaGlkZUxvYWRpbmcoKVxyXG4gICAgICAgICAgcmVzb2x2ZShwaWNhcnIpXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIHVwKCk7XHJcbiAgICB9KVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogZ2V0UmVjb3JkXHJcbiAgICog6I635Y+W5b2T5pel5beh5p+l6K6w5b2VXHJcbiAgICovXHJcbiAgcHVibGljIGdldFJlY29yZCh0eXBlOiBtYWluVHlwZSkge1xyXG4gICAgbGV0IHR5cGUyOiBOdW1iZXIgfCBTdHJpbmcgPSAwXHJcbiAgICB0eXBlMiA9IHRoaXMudHlwZUhhbmRsZSh0eXBlKVxyXG4gICAgcmV0dXJuIHRoaXMuaHR0cChgL2JhY2tlbmQvYXBpL1VzZXJQYXRyb2xMaXN0YCwgJ0dFVCcsIHsgZGF0YTogeyB0eXBlOiB0eXBlMiB9IH0sIFwiYXV0aG9yaXR5XCIpXHJcbiAgfVxyXG4gIC8qKlxyXG4gICAqIHNldFBhdHJvbFR5cGVcclxuICAgKiDorr7nva7ov5vlhaXlt6Hmn6XpobXpnaLnmoTntK/lv4NcclxuICAgKi9cclxuICBwdWJsaWMgc2V0UGF0cm9sVHlwZSh0eXBlOiAnbmV3JyB8ICdyZWNvcmQnKSB7XHJcbiAgICB3eC5zZXRTdG9yYWdlU3luYygncGF0cm9sVHlwZScsIHR5cGUpXHJcbiAgfVxyXG4gIC8qKlxyXG4gICAqIHNldFJlY29yZERhdGFcclxuICAgKiDorr7nva7mn6XnnIvlt6Hmn6XorrDlvZXml7bnmoTkvKDpgJLmlbDmja5cclxuICAgKi9cclxuICBwdWJsaWMgc2V0UmVjb3JkRGF0YShkYXRhOiB7IHR5cGU6IG1haW5UeXBlLCBjb21taXR0ZWVfaWQ/OiBudW1iZXIsIHN1YmRpc3RyaWN0X2lkPzogbnVtYmVyIH0pIHtcclxuICAgIHd4LnNldFN0b3JhZ2VTeW5jKCdyZWNvcmREYXRhJywgZGF0YSlcclxuICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICog6I635Y+W56S+5Yy6566h55CG5YiX6KGoXHJcbiAgICovXHJcbiAgcHVibGljIGdldENvbW11bml0eUxpc3QodXBEYXRhOiB7XHJcbiAgICB0eXBlOiBtYWluVHlwZSB8IG51bWJlcixcclxuICAgIHBhZ2U6IG51bWJlciB8IHN0cmluZyxcclxuICAgIHBhZ2VTaXplPzogbnVtYmVyXHJcbiAgfSkge1xyXG4gICAgbGV0IHR5cGVOdW1iZXI6IG51bWJlciB8IHN0cmluZyA9IDBcclxuICAgIHR5cGVOdW1iZXIgPSB0aGlzLnR5cGVIYW5kbGUodXBEYXRhLnR5cGUpXHJcbiAgICB1cERhdGEudHlwZSA9IHR5cGVOdW1iZXJcclxuICAgIHVwRGF0YS5wYWdlID0gdXBEYXRhLnBhZ2UgfHwgMVxyXG4gICAgdXBEYXRhLnBhZ2VTaXplID0gdXBEYXRhLnBhZ2VTaXplIHx8IDEwXHJcbiAgICByZXR1cm4gdGhpcy5odHRwKCcvaW5mb3JtYXRpb24vYXBpL2FyZWFMaXN0JywgXCJHRVRcIiwgeyBkYXRhOiB1cERhdGEgfSwgJ2F1dGhvcml0eScpXHJcbiAgfVxyXG4gIC8qKlxyXG4gICAqIOiOt+WPluekvuWMuueuoeeQhuivpuaDhVxyXG4gICAqL1xyXG4gIHB1YmxpYyBnZXRDb21tdW5pdHlEZXRhaWwodXBEYXRhOiB7XHJcbiAgICBzdWJkaXN0cmljdF9pZD86IG51bWJlciB8IHN0cmluZyxcclxuICB9KSB7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwKCcvYmFja2VuZC94Y3gvU3ViRGlzdHJpY3REZXRhaWwnLCBcIkdFVFwiLCB7IGRhdGE6IHVwRGF0YSB9LCAnYXV0aG9yaXR5JylcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOiOt+WPluW3oeafpeaKpeWRiuaVsOaNrlxyXG4gICAqL1xyXG4gIHB1YmxpYyBnZXRSZXBvcnREYXRhKHVwRGF0YToge1xyXG4gICAgdHlwZTogbWFpblR5cGUgfCBudW1iZXIsXHJcbiAgICBwYWdlOiBudW1iZXIgfCBzdHJpbmcsXHJcbiAgICBwYWdlU2l6ZT86IG51bWJlclxyXG4gIH0pIHtcclxuICAgIGxldCB0eXBlTnVtYmVyOiBudW1iZXIgfCBzdHJpbmcgPSAwXHJcbiAgICB0eXBlTnVtYmVyID0gdGhpcy50eXBlSGFuZGxlKHVwRGF0YS50eXBlKVxyXG4gICAgdXBEYXRhLnR5cGUgPSB0eXBlTnVtYmVyXHJcbiAgICB1cERhdGEucGFnZSA9IHVwRGF0YS5wYWdlIHx8IDFcclxuICAgIHVwRGF0YS5wYWdlU2l6ZSA9IHVwRGF0YS5wYWdlU2l6ZSB8fCAyNVxyXG4gICAgcmV0dXJuIHRoaXMuaHR0cCgnL2JhY2tlbmQvYXBpL3BhdHJvbExpc3QnLCBcIkdFVFwiLCB7IGRhdGE6IHVwRGF0YSB9LCAnYXV0aG9yaXR5JylcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOiOt+WPluWIhuexu+aXtuaViOaVsOaNrlxyXG4gICAqL1xyXG4gIHB1YmxpYyBnZXRDbGFzc2lmaWNhdGlvbkRhdGEoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwKCcvYmFja2VuZC9hcGkvY2xhc3NpZmljYXRpb24nLCBcIkdFVFwiLCB7fSwgJ2F1dGhvcml0eScpXHJcbiAgfVxyXG5cclxuICAvLyDmo4Dmn6XmmK/lkKbnu5HlrprmiYvmnLrlj7dcclxuICBwdWJsaWMgZ2V0UGhvbmVOdW1iZXIoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwKCcvYmFja2VuZC9hcGkvY2hlY2tVc2VyTW9iaWxlJywgXCJHRVRcIiwge30sICdhdXRob3JpdHknKVxyXG4gIH1cclxuICAvLyDnu5Hlrprlvq7kv6HmiYvmnLrlj7dcclxuICBwdWJsaWMgYmluZFBob25lKHVwRGF0YToge1xyXG4gICAgd3hjb2RlOiBzdHJpbmcsXHJcbiAgICBlbmNyeXB0ZWREYXRhOiBzdHJpbmcsXHJcbiAgICBvZmZzZXQ6IHN0cmluZ1xyXG4gICAgfSkge1xyXG4gICAgICByZXR1cm4gdGhpcy5odHRwKCcvYmFja2VuZC9hcGkvYmluZE1vYmlsZScsIFwiUE9TVFwiLCB7ZGF0YTogdXBEYXRhfSwgJ2F1dGhvcml0eScpXHJcbiAgICB9XHJcbiAgLy8g6L6T5YWl5omL5py65Y+357uR5a6aXHJcbiAgcHVibGljIGlwdFBob25lKHVwRGF0YToge1xyXG4gICAgbW9iaWxlOiBzdHJpbmcsXHJcbiAgICB9KSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmh0dHAoJy9iYWNrZW5kL2FwaS9iaW5kTW9iaWxlTmV3JywgXCJQT1NUXCIsIHtkYXRhOiB1cERhdGF9LCAnYXV0aG9yaXR5JylcclxuICB9XHJcbiAgLy8g5Y+w6LSm5aGr5oqlXHJcbiAgcHVibGljIG5ld0FjY291bnQoZGF0YToge1xyXG4gICAgd2FzdGVfZHJ5OiBzdHJpbmcsXHJcbiAgICB3YXN0ZV93ZXQ6IHN0cmluZyxcclxuICAgIHdhc3RlX3JlY3ljbGFibDogc3RyaW5nLFxyXG4gICAgd2FzdGVfYXJjaGl0ZWN0dXJlOiBzdHJpbmcsXHJcbiAgICB3YXN0ZV9oYXJtZnVsOiBzdHJpbmcsXHJcbiAgICBkZXBhcnR1cmVfdGltZTogc3RyaW5nLFxyXG4gIH0pIHtcclxuICAgIHJldHVybiB0aGlzLmh0dHAoYC9iYWNrZW5kL2FwaS9zZWxmU2F2ZVJlY29yZGAsICdQT1NUJywgeyBkYXRhOiBkYXRhIH0sICdhdXRob3JpdHknKVxyXG4gIH1cclxuICBwdWJsaWMgbmV3QWNjb3VudDIoZGF0YToge1xyXG4gICAgd2FzdGVfZ2xhc3M6IG51bWJlciB8IHN0cmluZyxcclxuICAgIHdhc3RlX3BsYXN0aWM6IG51bWJlciB8IHN0cmluZyxcclxuICAgIHdhc3RlX3dvb2Q6IG51bWJlciB8IHN0cmluZyxcclxuICAgIHdhc3RlX3BhcGVyOiBudW1iZXIgfCBzdHJpbmcsXHJcbiAgICB3YXN0ZV9lbGVjdHJvbmljOiBudW1iZXIgfCBzdHJpbmcsXHJcbiAgICB3YXN0ZV9jbG90aGVzOiBudW1iZXIgfCBzdHJpbmcsXHJcbiAgICB3YXN0ZV9tZXRhbDogbnVtYmVyIHwgc3RyaW5nLFxyXG4gICAgd2FzdGVfb3RoZXI6IG51bWJlciB8IHN0cmluZyxcclxuICAgIGRlcGFydHVyZV90aW1lOiBzdHJpbmcsXHJcbiAgfSkge1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cChgL2JhY2tlbmQvYXBpL3NlbGZTYXZlUmVjb3JkYCwgJ1BPU1QnLCB7IGRhdGE6IGRhdGEgfSwgJ2F1dGhvcml0eScpXHJcbiAgfVxyXG5cclxuICAvLyDlkI7lj7BcclxuICAvKipcclxuICAgKiBnZXRBbmFseXNpc0RhdGFcclxuICAgKiDojrflj5bmlbTmlLnmlbDph49cclxuICAgKiDlkI7lj7DpppbpobVcclxuICAgKi9cclxuICBwdWJsaWMgZ2V0QW5hbHlzaXNEYXRhKHR5cGU/OiBtYWluVHlwZSkge1xyXG4gICAgbGV0IHR5cGVOdW1iZXI6IG51bWJlciB8IHN0cmluZyA9IDBcclxuICAgIHR5cGVOdW1iZXIgPSB0aGlzLnR5cGVIYW5kbGUodHlwZSlcclxuICAgIHJldHVybiB0aGlzLmh0dHAoJy9iYWNrZW5kL2FwaS9hbmFseXNpc0RhdGEnLCBcIkdFVFwiLCB7IGRhdGE6IHsgdHlwZTogdHlwZU51bWJlciB9IH0sICdhdXRob3JpdHknKVxyXG4gIH1cclxuICBwdWJsaWMgc2V0RmVlZGJhY2tUeXBlKHR5cGU6IG1haW5UeXBlKSB7XHJcbiAgICB3eC5zZXRTdG9yYWdlU3luYygnZmVlZGJhY2tUeXBlJywgdHlwZSlcclxuICB9XHJcbiAgcHVibGljIGdldFBvaW50cyh0eXBlPzogbWFpblR5cGUpIHtcclxuICAgIGxldCB0eXBlTnVtYmVyOiBudW1iZXIgfCBzdHJpbmcgPSAwXHJcbiAgICB0eXBlTnVtYmVyID0gdGhpcy50eXBlSGFuZGxlKHR5cGUpXHJcbiAgICByZXR1cm4gdGhpcy5odHRwKCcvYmFja2VuZC94Y3gvcmF0ZURhdGEnLCBcIkdFVFwiLCB7IGRhdGE6IHsgdHlwZTogdHlwZU51bWJlciB9IH0sICdhdXRob3JpdHknKVxyXG4gIH1cclxuICAvKipcclxuICAgKiBnZXRGZWVkYmFja0xpc3RcclxuICAgKiDojrflj5bmlbTmlLnlj43ppojliJfooahcclxuICAgKi9cclxuICBwdWJsaWMgZ2V0RmVlZGJhY2tMaXN0KHVwRGF0YToge1xyXG4gICAgdHlwZTogbWFpblR5cGUgfCBudW1iZXIsXHJcbiAgICBzdGF0dXM6ICdhbGwnIHwgJ3BlbmRpbmcnIHwgJ25vdHlldCcgfCAnZG9uZScgfCBudW1iZXIgfCBzdHJpbmcsXHJcbiAgICBwYWdlOiBudW1iZXIgfCBzdHJpbmcsXHJcbiAgICBuYW1lPzogc3RyaW5nLFxyXG4gICAgcGFnZVNpemU/OiBudW1iZXIsXHJcbiAgICBkZWZ1Y3RfaWQ/OiBudW1iZXIgfCBzdHJpbmcsXHJcbiAgICBjYXRlZ29yeV9pZD86IG51bWJlciB8IHN0cmluZ1xyXG4gIH0pIHtcclxuICAgIGxldCB0eXBlTnVtYmVyID0gMFxyXG4gICAgbGV0IHN0YXR1c0NvZGU6IG51bWJlciB8IHN0cmluZyA9IDBcclxuICAgIHR5cGVOdW1iZXIgPSB0aGlzLnR5cGVIYW5kbGUodXBEYXRhLnR5cGUpXHJcbiAgICBzd2l0Y2ggKHVwRGF0YS5zdGF0dXMpIHtcclxuICAgICAgY2FzZSAnYWxsJzpcclxuICAgICAgICBzdGF0dXNDb2RlID0gJydcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAncGVuZGluZyc6XHJcbiAgICAgICAgc3RhdHVzQ29kZSA9IDJcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAnbm90eWV0JzpcclxuICAgICAgICBzdGF0dXNDb2RlID0gLTFcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAnZG9uZSc6XHJcbiAgICAgICAgc3RhdHVzQ29kZSA9IDFcclxuICAgICAgICBicmVhaztcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICBicmVhaztcclxuICAgIH1cclxuICAgIHVwRGF0YS50eXBlID0gdHlwZU51bWJlclxyXG4gICAgdXBEYXRhLnBhZ2VTaXplID0gMTBcclxuICAgIHVwRGF0YS5zdGF0dXMgPSBzdGF0dXNDb2RlXHJcbiAgICBjb25zb2xlLmxvZyh1cERhdGEpXHJcbiAgICAvLyBwYWdlU2l6ZToxMCx0eXBlOnR5cGVOdW1iZXIsc3RhdHVzOnN0YXR1c0NvZGU/c3RhdHVzQ29kZTonJyxwYWdlOmRhdGEucGFnZSxuYW1lOmRhdGEubmFtZT9kYXRhLm5hbWU6JydcclxuICAgIHJldHVybiB0aGlzLmh0dHAoYC9iYWNrZW5kL2FwaS9hbmFseXNpc0xpc3RgLCAnR0VUJywgeyBkYXRhOiB1cERhdGEgfSwgJ2F1dGhvcml0eScpXHJcbiAgfVxyXG4gIC8qKlxyXG4gICAqIHVwRmVlZGJhY2tcclxuICAgKiDkuIrkvKDlj43ppohcclxuICAgKi9cclxuICBwdWJsaWMgdXBGZWVkYmFjayhkYXRhOiB7XHJcbiAgICBmZWVkYmFjazogc3RyaW5nLFxyXG4gICAgaW1hZ2VfdXJsOiBBcnJheTxzdHJpbmc+LFxyXG4gICAgY2F0ZWdvcnlfaWQ6IG51bWJlciB8IHN0cmluZyxcclxuICAgIGRlZnVjdF9pZDogbnVtYmVyIHwgc3RyaW5nLFxyXG4gIH0pIHtcclxuICAgIHJldHVybiB0aGlzLmh0dHAoJy9iYWNrZW5kL2FwaS9kb0FjdGlvbkZlZWRiYWNrJywgJ1BPU1QnLCB7IGRhdGE6IGRhdGEgfSwgJ2F1dGhvcml0eScpXHJcbiAgfVxyXG4gIC8qKlxyXG4gICAqIG5ld0FjdGl2aXR5XHJcbiAgICog5Yib5bu65rS75YqoXHJcbiAgICovXHJcbiAgcHVibGljIG5ld0FjdGl2aXR5KGRhdGE6IHtcclxuICAgIHRpdGxlOiBzdHJpbmcsXHJcbiAgICBpbWFnZV91cmw6IEFycmF5PHN0cmluZz4sXHJcbiAgICBhY3Rpdml0eV90eXBlOiBudW1iZXIgfCBzdHJpbmcsXHJcbiAgICBzdGFydF90aW1lOiBzdHJpbmcsXHJcbiAgICBjb250ZW50OiBzdHJpbmcsXHJcbiAgfSkge1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cChgL2JhY2tlbmQvYXBpL2FjdGl2aXR5L2NyZWF0ZWAsICdQT1NUJywgeyBkYXRhOiBkYXRhIH0sICdhdXRob3JpdHknKVxyXG4gIH1cclxuICAvKipcclxuICAgKiBnZXRTdW1tYXJ5XHJcbiAgICog6I635Y+W6Zeu6aKY5rGH5oC75pWw5o2uXHJcbiAgICovXHJcbiAgcHVibGljIGdldFN1bW1hcnkodHlwZTogbWFpblR5cGV8c3RyaW5nLHBhZ2U6YW55LCBzaXplOmFueSkge1xyXG4gICAgbGV0IHR5cGVudW1iZXIgPSB0aGlzLnR5cGVIYW5kbGUodHlwZSlcclxuICAgIHJldHVybiB0aGlzLmh0dHAoJy9iYWNrZW5kL3hjeC9xdWVzdGlvblJhbmtpbmcnLCAnR0VUJywgeyBkYXRhOiB7IHR5cGU6IHR5cGVudW1iZXIsIHBhZ2U6IHBhZ2UsIHBhZ2VTaXplOiBzaXplIH0gfSwgJ2F1dGhvcml0eScpXHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiByZWN0aWZpY2F0aW9uXHJcbiAgICog6Zeu6aKY5YiG5p6QLemXrumimOaxh+aAu1xyXG4gICAqL1xyXG4gIHB1YmxpYyByZWN0aWZpY2F0aW9uKHR5cGU6IG1haW5UeXBlfHN0cmluZykge1xyXG4gICAgbGV0IHR5cGVudW1iZXIgPSB0aGlzLnR5cGVIYW5kbGUodHlwZSlcclxuICAgIHJldHVybiB0aGlzLmh0dHAoJy9iYWNrZW5kL3hjeC9yZWN0aWZpY2F0aW9uJywgJ0dFVCcsIHsgZGF0YTogeyB0eXBlOiB0eXBlbnVtYmVyIH0gfSwgJ2F1dGhvcml0eScpXHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBnZXRSYXRlXHJcbiAgICog6Zeu6aKY5YiG5p6QLei+vuagh+eOh1xyXG4gICAqL1xyXG4gIHB1YmxpYyBnZXRSYXRlKHR5cGU6IG1haW5UeXBlfHN0cmluZykge1xyXG4gICAgbGV0IHR5cGVudW1iZXIgPSB0aGlzLnR5cGVIYW5kbGUodHlwZSlcclxuICAgIHJldHVybiB0aGlzLmh0dHAoJy9iYWNrZW5kL3hjeC95aWVsZCcsICdHRVQnLCB7IGRhdGE6IHsgdHlwZTogdHlwZW51bWJlciB9IH0sICdhdXRob3JpdHknKVxyXG4gIH1cclxuICAvKipcclxuICAgKiBnZXRNYXBcclxuICAgKiDojrflj5blnLDlm77mjqXlj6NcclxuICAgKi9cclxuICBwdWJsaWMgZ2V0TWFwKCkge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLHJlamVjdCk9PntcclxuICAgICAgdGhpcy5odHRwKGB4Y3gvYXBpL21hcGAsJ0dFVCcse30sJ2F1dGhvcml0eScpLnRoZW4oKHJlczphbnkpPT57XHJcbiAgICAgICAgbGV0IG91dFB1dCA9IDxhbnk+W11cclxuICAgICAgICBsZXQgZGF0YSA9IHJlcy5kYXRhLnJlc3VsdFxyXG4gICAgICAgIGRhdGEuZm9yRWFjaCgoZWxlbWVudDphbnksaW5kZXg6bnVtYmVyKSA9PiB7XHJcbiAgICAgICAgICBsZXQgcG9pbnQgPSBlbGVtZW50LmNlbnRlci5zcGxpdCgnLCcpXHJcbiAgICAgICAgICBsZXQgIGxvbmdpdHVkZSA9IHBvaW50WzBdXHJcbiAgICAgICAgICBsZXQgIGxhdGl0dWRlID0gcG9pbnRbMV1cclxuICAgICAgICAgIG91dFB1dC5wdXNoKHtcclxuICAgICAgICAgICAgaWQ6aW5kZXgsXHJcbiAgICAgICAgICAgIHdpZHRoOjQwLFxyXG4gICAgICAgICAgICBoZWlnaHQ6NDAsXHJcbiAgICAgICAgICAgIGxhdGl0dWRlLFxyXG4gICAgICAgICAgICBsb25naXR1ZGUsXHJcbiAgICAgICAgICAgIGljb25QYXRoOiAnL3N0YXRpYy9tYXJrZXJIb21lLnBuZycsXHJcbiAgICAgICAgICAgIGxpc3Q6ZWxlbWVudC5saXN0LFxyXG4gICAgICAgICAgICBjdXN0b21DYWxsb3V0OiB7XHJcbiAgICAgICAgICAgICAgYW5jaG9yWTogMTAsXHJcbiAgICAgICAgICAgICAgYW5jaG9yWDogMTAsXHJcbiAgICAgICAgICAgICAgZGlzcGxheTogJ0JZQ0xJQ0snLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgfSlcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXNvbHZlKG91dFB1dClcclxuICAgICAgfSwoZXJyKT0+e1xyXG4gICAgICAgIHJlamVjdChlcnIpXHJcbiAgICAgIH0pXHJcbiAgICB9KSBcclxuICB9XHJcbn1cclxuY29uc3QgYXBpID0gbmV3IEFQSVxyXG5leHBvcnQgZGVmYXVsdCBhcGlcclxuXHJcblxyXG5cclxuXHJcblxyXG4vLyBleHBvcnQgZGVmYXVsdCBhcGk7Il19