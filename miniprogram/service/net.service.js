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
        this.HOST = 'https://api.021xzy.com/';
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
                        width: 20,
                        height: 20,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmV0LnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJuZXQuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBLE1BQU0sVUFBVSxHQUFHLENBQUMsR0FBUSxFQUFFLEVBQUU7SUFDOUIsUUFBUSxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRTtRQUNyQixLQUFLLEdBQUc7WUFDTixFQUFFLENBQUMsU0FBUyxFQUFFLENBQUM7WUFDZixFQUFFLENBQUMsU0FBUyxDQUFDO2dCQUNYLEtBQUssRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sSUFBSSxNQUFNO2dCQUNqQyxJQUFJLEVBQUUsTUFBTTtnQkFDWixRQUFRLEVBQUUsSUFBSTthQUNmLENBQUMsQ0FBQTtZQUNGLE1BQU07UUFDUixLQUFLLEdBQUc7WUFDTixFQUFFLENBQUMsU0FBUyxFQUFFLENBQUM7WUFDZixFQUFFLENBQUMsVUFBVSxDQUFDLEVBQUUsR0FBRyxFQUFFLG9CQUFvQixFQUFFLENBQUMsQ0FBQTtZQUM1QyxNQUFNO1FBQ1I7WUFDRSxFQUFFLENBQUMsU0FBUyxDQUFDO2dCQUNYLEtBQUssRUFBRSxNQUFNO2dCQUNiLElBQUksRUFBRSxNQUFNO2dCQUNaLFFBQVEsRUFBRSxJQUFJO2FBQ2YsQ0FBQyxDQUFBO1lBQ0YsRUFBRSxDQUFDLFNBQVMsRUFBRSxDQUFDO1lBQ2YsTUFBTTtLQUNUO0FBQ0gsQ0FBQyxDQUFDO0FBQ0YsTUFBTSxhQUFhLEdBQUcsQ0FBQyxHQUFRLEVBQUUsRUFBRTtJQUNqQyxRQUFRLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFO1FBQ3JCLEtBQUssR0FBRztZQUNOLEVBQUUsQ0FBQyxTQUFTLEVBQUUsQ0FBQztZQUNmLE1BQU07UUFDUixLQUFLLEdBQUc7WUFDTixFQUFFLENBQUMsU0FBUyxFQUFFLENBQUM7WUFDZixFQUFFLENBQUMsU0FBUyxDQUFDO2dCQUNYLEtBQUssRUFBRSxHQUFHLENBQUMsSUFB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T0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFBO1lBQ2pCLENBQUMsRUFBQyxDQUFDLEdBQUcsRUFBQyxFQUFFO2dCQUNQLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQTtZQUNiLENBQUMsQ0FBQyxDQUFBO1FBQ0osQ0FBQyxDQUFDLENBQUE7SUFDSixDQUFDO0NBQ0Y7QUFDRCxNQUFNLEdBQUcsR0FBRyxJQUFJLEdBQUcsQ0FBQTtBQUNuQixrQkFBZSxHQUFHLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBjb25zdCBhcGk6YW55ID0ge307XHJcblxyXG5jb25zdCBmYWlsSGFuZGxlID0gKGVycjogYW55KSA9PiB7XHJcbiAgc3dpdGNoIChlcnIuZGF0YS5jb2RlKSB7XHJcbiAgICBjYXNlIDQwMDpcclxuICAgICAgd3guaGlkZVRvYXN0KCk7XHJcbiAgICAgIHd4LnNob3dUb2FzdCh7XHJcbiAgICAgICAgdGl0bGU6IGVyci5kYXRhLm1lc3NhZ2UgfHwgJ+ivt+axguWksei0pScsXHJcbiAgICAgICAgaWNvbjogXCJub25lXCIsXHJcbiAgICAgICAgZHVyYXRpb246IDIwMDBcclxuICAgICAgfSlcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIDQwMTpcclxuICAgICAgd3guaGlkZVRvYXN0KCk7XHJcbiAgICAgIHd4LnJlZGlyZWN0VG8oeyB1cmw6ICcvcGFnZXMvbG9naW4vbG9naW4nIH0pXHJcbiAgICAgIGJyZWFrO1xyXG4gICAgZGVmYXVsdDpcclxuICAgICAgd3guc2hvd1RvYXN0KHtcclxuICAgICAgICB0aXRsZTogJ+ivt+axguWksei0pScsXHJcbiAgICAgICAgaWNvbjogXCJub25lXCIsXHJcbiAgICAgICAgZHVyYXRpb246IDIwMDBcclxuICAgICAgfSlcclxuICAgICAgd3guaGlkZVRvYXN0KCk7XHJcbiAgICAgIGJyZWFrO1xyXG4gIH1cclxufTtcclxuY29uc3Qgc3VjY2Vzc0hhbmRsZSA9IChyZXM6IGFueSkgPT4ge1xyXG4gIHN3aXRjaCAocmVzLmRhdGEuY29kZSkge1xyXG4gICAgY2FzZSAyMDA6XHJcbiAgICAgIHd4LmhpZGVUb2FzdCgpO1xyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgNDAwOlxyXG4gICAgICB3eC5oaWRlVG9hc3QoKTtcclxuICAgICAgd3guc2hvd1RvYXN0KHtcclxuICAgICAgICB0aXRsZTogcmVzLmRhdGEubWVzc2FnZSB8fCAn6K+35rGC5oiQ5YqfJyxcclxuICAgICAgICBpY29uOiBcIm5vbmVcIixcclxuICAgICAgICBkdXJhdGlvbjogMjAwMFxyXG4gICAgICB9KVxyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgNDAxOlxyXG4gICAgICB3eC5oaWRlVG9hc3QoKTtcclxuICAgICAgd3gucmVkaXJlY3RUbyh7IHVybDogJy9wYWdlcy9sb2dpbi9sb2dpbicgfSlcclxuICAgICAgYnJlYWs7XHJcbiAgICBkZWZhdWx0OlxyXG4gICAgICB3eC5oaWRlVG9hc3QoKTtcclxuICAgICAgYnJlYWs7XHJcbiAgfVxyXG59XHJcbmludGVyZmFjZSBwYXRyb2xEYXRhIHtcclxuICB0eXBlOiBtYWluVHlwZSxcclxuICBjb21taXR0ZWU/OiBbYW55XSxcclxuICB1bml0PzogW2FueV0sXHJcbiAgY29tbXVuaXR5PzogW2FueV0sXHJcbiAgdmlsbGFnZT86IFthbnldLFxyXG4gIHBlbmFsdGllczogYW55LFxyXG4gIHNfdW5pdD86IGFueSxcclxuICBzX2NvbW1pdHRlZT86IGFueSxcclxuICBzX2NvbW11bml0eT86IGFueVxyXG4gIHNfdmlsbGFnZT86IGFueVxyXG59XHJcblxyXG5leHBvcnQgdHlwZSBtYWluVHlwZSA9IFwiY29tbXVuaXR5XCIgfCBcInN0cmVldFwiIHwgXCJ1bml0XCIgfCBcInZpbGxhZ2VcIiB8IE51bWJlcjtcclxuXHJcbmNsYXNzIEFQSSB7XHJcbiAgLy8gcHJpdmF0ZSBIT1NUID0gJ2h0dHBzOi8vdGVzdGFwaS4wMjF4enkuY29tLyc7IC8vIOa1i+ivleeOr+WigzJcclxuICAvLyBwcml2YXRlIEhPU1QgPSAnaHR0cHM6Ly90aWNrZXQtYXBpLmppYS1leHBvLmNvbS8nOyAvLyDmtYvor5Xnjq/looNcclxuICBwcml2YXRlIEhPU1QgPSAnaHR0cHM6Ly9hcGkuMDIxeHp5LmNvbS8nIC8vIOato+W8j+eOr+Wig1xyXG4gIHByaXZhdGUgaHR0cChVUkw6IHN0cmluZywgdHlwZTogXCJPUFRJT05TXCIgfCBcIkdFVFwiIHwgXCJIRUFEXCIgfCBcIlBPU1RcIiB8IFwiUFVUXCIgfCBcIkRFTEVURVwiIHwgXCJUUkFDRVwiIHwgXCJDT05ORUNUXCIgfCB1bmRlZmluZWQsIG9wdGlvbjogeyBkYXRhPzogYW55LCBoZWFkZXI/OiBhbnkgfSwgYXV0aG9yaXR5PzogJ2F1dGhvcml0eScpIHtcclxuICAgIGxldCB0b2tlbiA9IHd4LmdldFN0b3JhZ2VTeW5jKCd0b2tlbicpXHJcbiAgICBsZXQgX2RhdGE6IGFueSA9IG9wdGlvbi5kYXRhIHx8IHt9O1xyXG4gICAgbGV0IF9oZWFkZXI6IGFueSA9IG9wdGlvbi5kYXRhIHx8IHt9O1xyXG4gICAgaWYgKGF1dGhvcml0eSA9PT0gJ2F1dGhvcml0eScpIHtcclxuICAgICAgX2hlYWRlciA9IHsgVG9rZW46IHRva2VuLCAuLi5faGVhZGVyIH1cclxuICAgIH1cclxuICAgIHd4LnNob3dUb2FzdCh7XHJcbiAgICAgIHRpdGxlOiBcIuWKoOi9veS4rVwiLFxyXG4gICAgICBpY29uOiAnbG9hZGluZycsXHJcbiAgICAgIGR1cmF0aW9uOiA5OTk5XHJcbiAgICB9KVxyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgd3gucmVxdWVzdCh7XHJcbiAgICAgICAgdXJsOiB0aGlzLkhPU1QgKyBVUkwsXHJcbiAgICAgICAgbWV0aG9kOiB0eXBlLFxyXG4gICAgICAgIGRhdGE6IF9kYXRhLFxyXG4gICAgICAgIHRpbWVvdXQ6IDUwMDAsXHJcbiAgICAgICAgaGVhZGVyOiB7XHJcbiAgICAgICAgICAnY29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxyXG4gICAgICAgICAgJ0FjY2Vzcy1Db250cm9sLUFsbG93LUhlYWRlcnMnOiAnT3JpZ2luLCBYLVJlcXVlc3RlZC1XaXRoLCBDb250ZW50LVR5cGUsIEFjY2VwdCwgQXV0aG9yaXphdGlvbicsXHJcbiAgICAgICAgICAnQWNjZXNzLUNvbnRyb2wtQWxsb3ctTWV0aG9kJzogJ0dFVCwgUE9TVCwgT1BUSU9OUycsXHJcbiAgICAgICAgICAnQWNjZXNzLUNvbnRyb2wtQWxsb3ctT3JpZ2luJzogXCIqXCIsXHJcbiAgICAgICAgICAuLi5faGVhZGVyXHJcbiAgICAgICAgfSxcclxuICAgICAgICBjb21wbGV0ZShlOiBhbnkpIHtcclxuICAgICAgICAgIGlmIChlLnN0YXR1c0NvZGUgPT09IDIwMCAmJiBlLmRhdGEuY29kZSA9PT0gMjAwKSB7XHJcbiAgICAgICAgICAgIHN1Y2Nlc3NIYW5kbGUoZSk7XHJcbiAgICAgICAgICAgIHJlc29sdmUoZSk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBmYWlsSGFuZGxlKGUpO1xyXG4gICAgICAgICAgICByZWplY3QoZSlcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICB9KVxyXG4gIH1cclxuICBwcml2YXRlIHR5cGVIYW5kbGUodHlwZT86IG1haW5UeXBlfHN0cmluZykge1xyXG4gICAgbGV0IHR5cGVOdW1iZXJcclxuICAgIHN3aXRjaCAodHlwZSkge1xyXG4gICAgICBjYXNlICdjb21tdW5pdHknOlxyXG4gICAgICAgIHR5cGVOdW1iZXIgPSA1XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgJ3ZpbGxhZ2UnOlxyXG4gICAgICAgIHR5cGVOdW1iZXIgPSA4XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgJ3VuaXQnOlxyXG4gICAgICAgIHR5cGVOdW1iZXIgPSA2XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgJ3N0cmVldCc6XHJcbiAgICAgICAgdHlwZU51bWJlciA9IDdcclxuICAgICAgICBicmVhaztcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICB0eXBlTnVtYmVyID0gMDtcclxuICAgICAgICBicmVhaztcclxuICAgIH1cclxuICAgIHJldHVybiB0eXBlTnVtYmVyXHJcbiAgfVxyXG4gIC8qKlxyXG4gICAqIGdldERhdGVcclxuICAgKi9cclxuICBwdWJsaWMgZ2V0RGF0ZSgpIHtcclxuICAgIHJldHVybiBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCkuc3BsaXQoJ1QnKVswXVxyXG4gIH1cclxuICBjb25zdHJ1Y3RvcigpIHsgfVxyXG4gIGNoZWNrVG9rZW4oKSB7XHJcbiAgICB0aGlzLmh0dHAoYC9iYWNrZW5kL2FwaS9jaGVja1Rva2VuYCwgJ0dFVCcsIHt9LCAnYXV0aG9yaXR5JylcclxuICB9XHJcbiAgbG9naW4odXNlcm5hbWU6IHN0cmluZywgcGFzc3dvcmQ6IHN0cmluZykge1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cCgnL2JhY2tlbmQvYXBpL2xvZ2luJywgXCJQT1NUXCIsIHsgZGF0YTogeyB1c2VyX25hbWU6IHVzZXJuYW1lLCBwd2Q6IHBhc3N3b3JkLCB0eXBlOiAxIH0gfSlcclxuICB9XHJcbiAgLyoqXHJcbiAqIGdldFVuaXRcclxuICog6I635Y+W5Y2V5L2NXHJcbiAqL1xyXG4gIHB1YmxpYyBnZXRVbml0KGNvbW1pdHRlZV9pZD86IG51bWJlciB8IHN0cmluZykge1xyXG4gICAgbGV0IGRhdGEgPSBjb21taXR0ZWVfaWQgPyB7IGNvbW1pdHRlZV9pZHM6IGNvbW1pdHRlZV9pZCArICcnIH0gOiB7fVxyXG4gICAgcmV0dXJuIHRoaXMuaHR0cChgL2JhY2tlbmQvYXBpL2NoZWNrQXJlYWAsIFwiR0VUXCIsIHsgZGF0YTogeyB0eXBlOiA2LCAuLi5kYXRhIH0gfSwgJ2F1dGhvcml0eScpXHJcbiAgfVxyXG4gIC8qKlxyXG4gICAqIGdldFN0cmVldFxyXG4gICAqIOiOt+WPluihl+mBk+W3oeafpeWIl+ihqFxyXG4gICAqL1xyXG4gIHB1YmxpYyBnZXRTdHJlZXQobmFtZT86IHN0cmluZykge1xyXG4gICAgbGV0IGRhdGEgPSBuYW1lID8geyBuYW1lIH0gOiB7fVxyXG4gICAgcmV0dXJuIHRoaXMuaHR0cChgL2JhY2tlbmQvYXBpL3N0cmVldFJvYWRMaXN0YCwgXCJHRVRcIiwgeyBkYXRhOiB7IC4uLmRhdGEgfSB9LCAnYXV0aG9yaXR5JylcclxuICB9XHJcbiAgLy8g6I635Y+W5bGF5aeUXHJcbiAgZ2V0Q29tbWl0dGUoY29tbWl0dGVlX2lkcz86IFtzdHJpbmcgfCBudW1iZXJdKSB7XHJcbiAgICBsZXQgaWRfc3RyaW5nID0gJydcclxuICAgIGxldCBkYXRhID0ge31cclxuICAgIGlmIChjb21taXR0ZWVfaWRzKSB7XHJcbiAgICAgIGNvbW1pdHRlZV9pZHMuZm9yRWFjaCgoZSwgaSkgPT4ge1xyXG4gICAgICAgIGlmIChpID09PSAwKSB7XHJcbiAgICAgICAgICBpZF9zdHJpbmcgPSBlICsgJydcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgaWRfc3RyaW5nID0gaWRfc3RyaW5nICsgJywnICsgZVxyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgIH1cclxuICAgIGlmIChpZF9zdHJpbmcpIHtcclxuICAgICAgZGF0YSA9IHsgY29tbWl0dGVlX2lkczogaWRfc3RyaW5nIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGhpcy5odHRwKGAvYmFja2VuZC9hcGkvY2hlY2tBcmVhYCwgXCJHRVRcIiwgeyBkYXRhOiB7IHR5cGU6IDQsIC4uLmRhdGEgfSB9LCAnYXV0aG9yaXR5JylcclxuICB9XHJcbiAgLyoqXHJcbiAgICog6I635Y+W5p2R5aeUXHJcbiAgICovXHJcbiAgZ2V0VmlsbGFnZUNvbW1pdHRlKGNvbW1pdHRlZV9pZHM/OiBbc3RyaW5nIHwgbnVtYmVyXSkge1xyXG4gICAgbGV0IGlkX3N0cmluZyA9ICcnXHJcbiAgICBsZXQgZGF0YSA9IHt9XHJcbiAgICBpZiAoY29tbWl0dGVlX2lkcykge1xyXG4gICAgICBjb21taXR0ZWVfaWRzLmZvckVhY2goKGUsIGkpID0+IHtcclxuICAgICAgICBpZiAoaSA9PT0gMCkge1xyXG4gICAgICAgICAgaWRfc3RyaW5nID0gZSArICcnXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGlkX3N0cmluZyA9IGlkX3N0cmluZyArICcsJyArIGVcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICB9XHJcbiAgICBpZiAoaWRfc3RyaW5nKSB7XHJcbiAgICAgIGRhdGEgPSB7IGNvbW1pdHRlZV9pZHM6IGlkX3N0cmluZyB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcy5odHRwKGAvYmFja2VuZC9hcGkvY2hlY2tBcmVhYCwgXCJHRVRcIiwgeyBkYXRhOiB7IHR5cGU6IDgsIC4uLmRhdGEgfSB9LCAnYXV0aG9yaXR5JylcclxuICB9XHJcbiAgZ2V0Q29tdW5pdHkoY29tbWl0dGVlX2lkczogW3N0cmluZ10sIHN1YmRpc3RyaWN0X2lkPzogbnVtYmVyIHwgc3RyaW5nKSB7XHJcbiAgICAvLyDojrflj5blsI/ljLpcclxuICAgIGxldCBpZF9zdHJpbmcgPSAnJ1xyXG4gICAgY29tbWl0dGVlX2lkcy5mb3JFYWNoKChlLCBpKSA9PiB7XHJcbiAgICAgIGlmIChpID09PSAwKSB7XHJcbiAgICAgICAgaWRfc3RyaW5nID0gZVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGlkX3N0cmluZyA9IGlkX3N0cmluZyArICcsJyArIGVcclxuICAgICAgfVxyXG4gICAgfSlcclxuICAgIGxldCBkYXRhID0ge31cclxuICAgIGRhdGEgPSBzdWJkaXN0cmljdF9pZCA/IHsgc3ViZGlzdHJpY3RfaWQ6IHN1YmRpc3RyaWN0X2lkICsgJycgfSA6IHt9XHJcbiAgICByZXR1cm4gdGhpcy5odHRwKGAvYmFja2VuZC9hcGkvY2hlY2tBcmVhYCwgXCJHRVRcIiwgeyBkYXRhOiB7IHR5cGU6IDUsIGNvbW1pdHRlZV9pZHM6IGlkX3N0cmluZywgLi4uZGF0YSB9IH0sICdhdXRob3JpdHknKVxyXG4gIH1cclxuICBnZXRWaWxsYWdlKGNvbW1pdHRlZV9pZHM6IFtzdHJpbmddLCBzdWJkaXN0cmljdF9pZD86IG51bWJlciB8IHN0cmluZykge1xyXG4gICAgLy8g6I635Y+W5bCP5Yy6XHJcbiAgICBsZXQgaWRfc3RyaW5nID0gJydcclxuICAgIGNvbW1pdHRlZV9pZHMuZm9yRWFjaCgoZSwgaSkgPT4ge1xyXG4gICAgICBpZiAoaSA9PT0gMCkge1xyXG4gICAgICAgIGlkX3N0cmluZyA9IGVcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBpZF9zdHJpbmcgPSBpZF9zdHJpbmcgKyAnLCcgKyBlXHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgICBsZXQgZGF0YSA9IHt9XHJcbiAgICBkYXRhID0gc3ViZGlzdHJpY3RfaWQgPyB7IHN1YmRpc3RyaWN0X2lkOiBzdWJkaXN0cmljdF9pZCArICcnIH0gOiB7fVxyXG4gICAgcmV0dXJuIHRoaXMuaHR0cChgL2JhY2tlbmQvYXBpL2NoZWNrQXJlYWAsIFwiR0VUXCIsIHsgZGF0YTogeyB0eXBlOiA1LCBjb21taXR0ZWVfaWRzOiBpZF9zdHJpbmcsIC4uLmRhdGEgfSB9LCAnYXV0aG9yaXR5JylcclxuICB9XHJcbiAgLy8g5pCc57Si5bCP5Yy6XHJcbiAgc2VhcmNoQ29tdW5pdHkobmFtZTogc3RyaW5nKSB7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwKGAvYmFja2VuZC9hcGkvY2hlY2tBcmVhYCwgXCJHRVRcIiwgeyBkYXRhOiB7IHR5cGU6IDUsIG5hbWU6IGVuY29kZVVSSShuYW1lKSB9IH0sICdhdXRob3JpdHknKVxyXG4gIH1cclxuXHJcbiAgLy8g5pCc57Si6KGM5pS/5p2RXHJcbiAgc2VhcmNoVmlsbGFnZShuYW1lOiBzdHJpbmcpIHtcclxuICAgIHJldHVybiB0aGlzLmh0dHAoYC9iYWNrZW5kL2FwaS9jaGVja0FyZWFgLCBcIkdFVFwiLCB7IGRhdGE6IHsgdHlwZTogNSwgbmFtZTogZW5jb2RlVVJJKG5hbWUpIH0gfSwgJ2F1dGhvcml0eScpXHJcbiAgfVxyXG4gIC8qKlxyXG4gICAqIHNlYXJjaFVuaXRcclxuICAgKiDmkJzntKLljZXkvY1cclxuICAgKi9cclxuICBwdWJsaWMgc2VhcmNoVW5pdChuYW1lOiBzdHJpbmcpIHtcclxuICAgIHJldHVybiB0aGlzLmh0dHAoYC9iYWNrZW5kL2FwaS9jaGVja0FyZWFgLCBcIkdFVFwiLCB7IGRhdGE6IHsgdHlwZTogNiwgbmFtZTogZW5jb2RlVVJJKG5hbWUpIH0gfSwgJ2F1dGhvcml0eScpXHJcbiAgfVxyXG4gIC8qKlxyXG4gICAqIGdldFBlbmFsdGllc1xyXG4gICAqIOiOt+WPluWwj+WMuuaJo+WIhumhuVxyXG4gICAqL1xyXG4gIHB1YmxpYyBnZXRDb211bml0eVBlbmFsdGllcyhzdWJkaXN0cmljdF9pZDogbnVtYmVyIHwgc3RyaW5nKSB7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwKCcvYmFja2VuZC9hcGkvZGVkdWN0UG9pbnRzQ29uZmlnJywgXCJHRVRcIiwgeyBkYXRhOiB7IHR5cGU6IDUsIHN1YmRpc3RyaWN0X2lkIH0gfSwgJ2F1dGhvcml0eScpXHJcbiAgfVxyXG4gIC8qKlxyXG4gKiBnZXRQZW5hbHRpZXNcclxuICog6I635Y+W6KGM5pS/5p2R5omj5YiG6aG5XHJcbiAqL1xyXG4gIHB1YmxpYyBnZXRWaWxsYWdlUGVuYWx0aWVzKHN1YmRpc3RyaWN0X2lkOiBudW1iZXIgfCBzdHJpbmcpIHtcclxuICAgIHJldHVybiB0aGlzLmh0dHAoJy9iYWNrZW5kL2FwaS9kZWR1Y3RQb2ludHNDb25maWcnLCBcIkdFVFwiLCB7IGRhdGE6IHsgdHlwZTogOCwgc3ViZGlzdHJpY3RfaWQgfSB9LCAnYXV0aG9yaXR5JylcclxuICB9XHJcbiAgLyoqXHJcbiAgICogZ2V0U3RyZWV0UGVuYWx0aWVzXHJcbiAgICog6I635Y+W5rK/6KGX6KGX6YGT5omj5YiG6aG5XHJcbiAgICovXHJcbiAgcHVibGljIGdldFN0cmVldFBlbmFsdGllcygpIHtcclxuICAgIHJldHVybiB0aGlzLmh0dHAoJy9iYWNrZW5kL2FwaS9kZWR1Y3RQb2ludHNDb25maWcnLCBcIkdFVFwiLCB7IGRhdGE6IHsgdHlwZTogNyB9IH0sICdhdXRob3JpdHknKVxyXG4gIH1cclxuICAvKipcclxuICAgKiBnZXRVbml0UGVuYWx0aWVzXHJcbiAgICog6I635Y+W5Y2V5L2N6YGT5omj5YiG6aG5XHJcbiAgICovXHJcbiAgcHVibGljIGdldFVuaXRQZW5hbHRpZXMoY29tbWl0dGVlX2lkOiBudW1iZXIgfCBzdHJpbmcpIHtcclxuICAgIHJldHVybiB0aGlzLmh0dHAoJy9iYWNrZW5kL2FwaS9kZWR1Y3RQb2ludHNDb25maWcnLCBcIkdFVFwiLCB7IGRhdGE6IHsgdHlwZTogNiwgY29tbWl0dGVlX2lkIH0gfSwgJ2F1dGhvcml0eScpXHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBzYXZlQ3VycmVudFBlbmFsdGllc1xyXG4gICAqIOS/neWtmOW9k+WJjeato+WcqOW3oeafpeeahOmhtemdoue8k+WtmFxyXG4gICAqL1xyXG4gIHB1YmxpYyBzYXZlQ3VycmVudFBlbmFsdGllcyhwYXRyb2xEYXRhOiBwYXRyb2xEYXRhKSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcclxuICAgICAgd3guc2V0U3RvcmFnZVN5bmMoJ3BhdHJvbERhdGFfJyArIHBhdHJvbERhdGEudHlwZSwgcGF0cm9sRGF0YSk7XHJcbiAgICAgIHJlc29sdmUodHJ1ZSlcclxuICAgIH0pXHJcbiAgfVxyXG4gIC8qKlxyXG4gICAqIGdldEN1cnJlbnRQZW5hbHRpZXNcclxuICAgKiDojrflj5blvZPliY3mraPlnKjlt6Hmn6XnmoTpobXpnaLnvJPlrZhcclxuICAgKi9cclxuICBwdWJsaWMgZ2V0Q3VycmVudFBlbmFsdGllcyh0eXBlOiBzdHJpbmcpIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xyXG4gICAgICByZXNvbHZlKHd4LmdldFN0b3JhZ2VTeW5jKCdwYXRyb2xEYXRhXycgKyB0eXBlKSlcclxuICAgIH0pXHJcbiAgfVxyXG4gIC8qKlxyXG4gICAqIHVwRGVjdXRDb211bml0eVxyXG4gICAqIOS4iuS8oOekvuWMuuaJk+WIhlxyXG4gICAqL1xyXG4gIHB1YmxpYyB1cERlY3V0Q29tdW5pdHkoZGF0YTogYW55KSB7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwKCcvYmFja2VuZC9hcGkvZGVkdWN0UG9pbnRzQWN0aW9uJywgXCJQT1NUXCIsIHsgZGF0YTogeyAuLi5kYXRhLCB0eXBlOiA1IH0gfSwgJ2F1dGhvcml0eScpXHJcbiAgfVxyXG4gIC8qKlxyXG4gKiB1cERlY3V0Q29tdW5pdHlcclxuICog5LiK5Lyg56S+5Yy65omT5YiGXHJcbiAqL1xyXG4gIHB1YmxpYyB1cERlY3V0VmlsbGFnZShkYXRhOiBhbnkpIHtcclxuICAgIHJldHVybiB0aGlzLmh0dHAoJy9iYWNrZW5kL2FwaS9kZWR1Y3RQb2ludHNBY3Rpb24nLCBcIlBPU1RcIiwgeyBkYXRhOiB7IC4uLmRhdGEsIHR5cGU6IDggfSB9LCAnYXV0aG9yaXR5JylcclxuICB9XHJcbiAgLyoqXHJcbiAgICogdXBEZWN1dFVuaXRcclxuICAgKiDkuIrkvKDljZXkvY3miZPliIZcclxuICAgKi9cclxuICBwdWJsaWMgdXBEZWN1dFVuaXQoZGF0YTogYW55KSB7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwKCcvYmFja2VuZC9hcGkvZGVkdWN0UG9pbnRzQWN0aW9uJywgXCJQT1NUXCIsIHsgZGF0YTogeyAuLi5kYXRhLCB0eXBlOiA2IH0gfSwgJ2F1dGhvcml0eScpXHJcbiAgfVxyXG4gIC8qKlxyXG4gICAqIHVwbG9hZEZpbGVcclxuICAgKiDlvq7kv6HkuIrkvKDlm77niYdcclxuICAgKi9cclxuICBwdWJsaWMgdXBsb2FkRmlsZSh0ZW1wVXJsOiBzdHJpbmcpIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgIGlmICh0ZW1wVXJsLmluZGV4T2YoJ2h0dHBzOi8vaW1nLmh4amJjZG4uY29tJykgPiAtMSkge1xyXG4gICAgICAgIC8vIEpTT04ucGFyc2UocmVzLmRhdGEpLnJlc3VsdExpc3RbMF0uYWNjZXNzX3VybFxyXG4gICAgICAgIGxldCBkYXRhID0ge1xyXG4gICAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkoeyByZXN1bHRMaXN0OiBbeyBhY2Nlc3NfdXJsOiB0ZW1wVXJsIH1dIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJlc29sdmUoZGF0YSlcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgICAgd3gudXBsb2FkRmlsZSh7XHJcbiAgICAgICAgdXJsOiAnaHR0cHM6Ly9hcGkuNTFqaWFiby5jb20vZmlsZS92Mi4wL3VwbG9hZEltYWdlJywgLy/ku4XkuLrnpLrkvovvvIzpnZ7nnJ/lrp7nmoTmjqXlj6PlnLDlnYBcclxuICAgICAgICBmaWxlUGF0aDogdGVtcFVybCxcclxuICAgICAgICBuYW1lOiAnZmlsZScsXHJcbiAgICAgICAgdGltZW91dDogNTAwMCxcclxuICAgICAgICBoZWFkZXI6IHtcclxuICAgICAgICAgICdUb2tlbic6IHd4LmdldFN0b3JhZ2VTeW5jKCd0b2tlbicpLFxyXG4gICAgICAgICAgJ2NvbnRlbnQtdHlwZSc6ICdtdWx0aXBhcnQvZm9ybS1kYXRhJyxcclxuICAgICAgICAgICdBY2Nlc3MtQ29udHJvbC1BbGxvdy1IZWFkZXJzJzogJ09yaWdpbiwgWC1SZXF1ZXN0ZWQtV2l0aCwgQ29udGVudC1UeXBlLCBBY2NlcHQsIEF1dGhvcml6YXRpb24nLFxyXG4gICAgICAgICAgJ0FjY2Vzcy1Db250cm9sLUFsbG93LU1ldGhvZCc6ICdHRVQsIFBPU1QsIE9QVElPTlMnLFxyXG4gICAgICAgICAgJ0FjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpbic6IFwiKlwiLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc3VjY2VzcyhyZXMpIHtcclxuICAgICAgICAgIHN1Y2Nlc3NIYW5kbGUocmVzKTtcclxuICAgICAgICAgIHJlc29sdmUocmVzKVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZmFpbChlKSB7XHJcbiAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgICB0aXRsZTogXCLkuIrkvKDlm77niYflpLHotKVcIixcclxuICAgICAgICAgICAgaWNvbjogJ25vbmUnLFxyXG4gICAgICAgICAgICBkdXJhdGlvbjogMjAwMFxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICByZWplY3QoZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgfSlcclxuICB9XHJcblxyXG4gIHB1YmxpYyB1cGxvYWRJbWdzKGltYWdlczogQXJyYXk8YW55Pikge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgbGV0IGluZGV4ID0gMFxyXG4gICAgICBsZXQgbGFzdCA9IGltYWdlcy5sZW5ndGggLSAxXHJcbiAgICAgIGxldCBwaWNhcnIgPSA8YW55PltdXHJcbiAgICAgIHd4LnNob3dMb2FkaW5nKHsgdGl0bGU6ICfkuIrkvKDkuK0nIH0pXHJcbiAgICAgIGxldCB1cCA9ICgpID0+IHtcclxuICAgICAgICBpZiAoaW5kZXggPD0gbGFzdCkge1xyXG4gICAgICAgICAgdGhpcy51cGxvYWRGaWxlKGltYWdlc1tpbmRleF0udXJsIHx8IGltYWdlc1tpbmRleF0pLnRoZW4oKHJlczogYW55KSA9PiB7XHJcbiAgICAgICAgICAgIHBpY2Fyci5wdXNoKEpTT04ucGFyc2UocmVzLmRhdGEpLnJlc3VsdExpc3RbMF0uYWNjZXNzX3VybClcclxuICAgICAgICAgICAgaW5kZXggPSBpbmRleCArIDFcclxuICAgICAgICAgICAgdXAoKTtcclxuICAgICAgICAgIH0sIChlcnI6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICB3eC5oaWRlTG9hZGluZygpXHJcbiAgICAgICAgICAgIHJlamVjdChlcnIpXHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB3eC5oaWRlTG9hZGluZygpXHJcbiAgICAgICAgICByZXNvbHZlKHBpY2FycilcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgdXAoKTtcclxuICAgIH0pXHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBnZXRSZWNvcmRcclxuICAgKiDojrflj5blvZPml6Xlt6Hmn6XorrDlvZVcclxuICAgKi9cclxuICBwdWJsaWMgZ2V0UmVjb3JkKHR5cGU6IG1haW5UeXBlKSB7XHJcbiAgICBsZXQgdHlwZTI6IE51bWJlciB8IFN0cmluZyA9IDBcclxuICAgIHR5cGUyID0gdGhpcy50eXBlSGFuZGxlKHR5cGUpXHJcbiAgICByZXR1cm4gdGhpcy5odHRwKGAvYmFja2VuZC9hcGkvVXNlclBhdHJvbExpc3RgLCAnR0VUJywgeyBkYXRhOiB7IHR5cGU6IHR5cGUyIH0gfSwgXCJhdXRob3JpdHlcIilcclxuICB9XHJcbiAgLyoqXHJcbiAgICogc2V0UGF0cm9sVHlwZVxyXG4gICAqIOiuvue9rui/m+WFpeW3oeafpemhtemdoueahOe0r+W/g1xyXG4gICAqL1xyXG4gIHB1YmxpYyBzZXRQYXRyb2xUeXBlKHR5cGU6ICduZXcnIHwgJ3JlY29yZCcpIHtcclxuICAgIHd4LnNldFN0b3JhZ2VTeW5jKCdwYXRyb2xUeXBlJywgdHlwZSlcclxuICB9XHJcbiAgLyoqXHJcbiAgICogc2V0UmVjb3JkRGF0YVxyXG4gICAqIOiuvue9ruafpeeci+W3oeafpeiusOW9leaXtueahOS8oOmAkuaVsOaNrlxyXG4gICAqL1xyXG4gIHB1YmxpYyBzZXRSZWNvcmREYXRhKGRhdGE6IHsgdHlwZTogbWFpblR5cGUsIGNvbW1pdHRlZV9pZD86IG51bWJlciwgc3ViZGlzdHJpY3RfaWQ/OiBudW1iZXIgfSkge1xyXG4gICAgd3guc2V0U3RvcmFnZVN5bmMoJ3JlY29yZERhdGEnLCBkYXRhKVxyXG4gIH1cclxuXHJcbiAgICAvKipcclxuICAgKiDojrflj5bnpL7ljLrnrqHnkIbliJfooahcclxuICAgKi9cclxuICBwdWJsaWMgZ2V0Q29tbXVuaXR5TGlzdCh1cERhdGE6IHtcclxuICAgIHR5cGU6IG1haW5UeXBlIHwgbnVtYmVyLFxyXG4gICAgcGFnZTogbnVtYmVyIHwgc3RyaW5nLFxyXG4gICAgcGFnZVNpemU/OiBudW1iZXJcclxuICB9KSB7XHJcbiAgICBsZXQgdHlwZU51bWJlcjogbnVtYmVyIHwgc3RyaW5nID0gMFxyXG4gICAgdHlwZU51bWJlciA9IHRoaXMudHlwZUhhbmRsZSh1cERhdGEudHlwZSlcclxuICAgIHVwRGF0YS50eXBlID0gdHlwZU51bWJlclxyXG4gICAgdXBEYXRhLnBhZ2UgPSB1cERhdGEucGFnZSB8fCAxXHJcbiAgICB1cERhdGEucGFnZVNpemUgPSB1cERhdGEucGFnZVNpemUgfHwgMTBcclxuICAgIHJldHVybiB0aGlzLmh0dHAoJy9pbmZvcm1hdGlvbi9hcGkvYXJlYUxpc3QnLCBcIkdFVFwiLCB7IGRhdGE6IHVwRGF0YSB9LCAnYXV0aG9yaXR5JylcclxuICB9XHJcbiAgLyoqXHJcbiAgICog6I635Y+W56S+5Yy6566h55CG6K+m5oOFXHJcbiAgICovXHJcbiAgcHVibGljIGdldENvbW11bml0eURldGFpbCh1cERhdGE6IHtcclxuICAgIHN1YmRpc3RyaWN0X2lkPzogbnVtYmVyIHwgc3RyaW5nLFxyXG4gIH0pIHtcclxuICAgIHJldHVybiB0aGlzLmh0dHAoJy9iYWNrZW5kL3hjeC9TdWJEaXN0cmljdERldGFpbCcsIFwiR0VUXCIsIHsgZGF0YTogdXBEYXRhIH0sICdhdXRob3JpdHknKVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog6I635Y+W5beh5p+l5oql5ZGK5pWw5o2uXHJcbiAgICovXHJcbiAgcHVibGljIGdldFJlcG9ydERhdGEodXBEYXRhOiB7XHJcbiAgICB0eXBlOiBtYWluVHlwZSB8IG51bWJlcixcclxuICAgIHBhZ2U6IG51bWJlciB8IHN0cmluZyxcclxuICAgIHBhZ2VTaXplPzogbnVtYmVyXHJcbiAgfSkge1xyXG4gICAgbGV0IHR5cGVOdW1iZXI6IG51bWJlciB8IHN0cmluZyA9IDBcclxuICAgIHR5cGVOdW1iZXIgPSB0aGlzLnR5cGVIYW5kbGUodXBEYXRhLnR5cGUpXHJcbiAgICB1cERhdGEudHlwZSA9IHR5cGVOdW1iZXJcclxuICAgIHVwRGF0YS5wYWdlID0gdXBEYXRhLnBhZ2UgfHwgMVxyXG4gICAgdXBEYXRhLnBhZ2VTaXplID0gdXBEYXRhLnBhZ2VTaXplIHx8IDI1XHJcbiAgICByZXR1cm4gdGhpcy5odHRwKCcvYmFja2VuZC9hcGkvcGF0cm9sTGlzdCcsIFwiR0VUXCIsIHsgZGF0YTogdXBEYXRhIH0sICdhdXRob3JpdHknKVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog6I635Y+W5YiG57G75pe25pWI5pWw5o2uXHJcbiAgICovXHJcbiAgcHVibGljIGdldENsYXNzaWZpY2F0aW9uRGF0YSgpIHtcclxuICAgIHJldHVybiB0aGlzLmh0dHAoJy9iYWNrZW5kL2FwaS9jbGFzc2lmaWNhdGlvbicsIFwiR0VUXCIsIHt9LCAnYXV0aG9yaXR5JylcclxuICB9XHJcblxyXG4gIC8vIOajgOafpeaYr+WQpue7keWumuaJi+acuuWPt1xyXG4gIHB1YmxpYyBnZXRQaG9uZU51bWJlcigpIHtcclxuICAgIHJldHVybiB0aGlzLmh0dHAoJy9iYWNrZW5kL2FwaS9jaGVja1VzZXJNb2JpbGUnLCBcIkdFVFwiLCB7fSwgJ2F1dGhvcml0eScpXHJcbiAgfVxyXG4gIC8vIOe7keWumuW+ruS/oeaJi+acuuWPt1xyXG4gIHB1YmxpYyBiaW5kUGhvbmUodXBEYXRhOiB7XHJcbiAgICB3eGNvZGU6IHN0cmluZyxcclxuICAgIGVuY3J5cHRlZERhdGE6IHN0cmluZyxcclxuICAgIG9mZnNldDogc3RyaW5nXHJcbiAgICB9KSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmh0dHAoJy9iYWNrZW5kL2FwaS9iaW5kTW9iaWxlJywgXCJQT1NUXCIsIHtkYXRhOiB1cERhdGF9LCAnYXV0aG9yaXR5JylcclxuICAgIH1cclxuICAvLyDovpPlhaXmiYvmnLrlj7fnu5HlrppcclxuICBwdWJsaWMgaXB0UGhvbmUodXBEYXRhOiB7XHJcbiAgICBtb2JpbGU6IHN0cmluZyxcclxuICAgIH0pIHtcclxuICAgICAgcmV0dXJuIHRoaXMuaHR0cCgnL2JhY2tlbmQvYXBpL2JpbmRNb2JpbGVOZXcnLCBcIlBPU1RcIiwge2RhdGE6IHVwRGF0YX0sICdhdXRob3JpdHknKVxyXG4gIH1cclxuICAvLyDlj7DotKbloavmiqVcclxuICBwdWJsaWMgbmV3QWNjb3VudChkYXRhOiB7XHJcbiAgICB3YXN0ZV9kcnk6IHN0cmluZyxcclxuICAgIHdhc3RlX3dldDogc3RyaW5nLFxyXG4gICAgd2FzdGVfcmVjeWNsYWJsOiBzdHJpbmcsXHJcbiAgICB3YXN0ZV9hcmNoaXRlY3R1cmU6IHN0cmluZyxcclxuICAgIHdhc3RlX2hhcm1mdWw6IHN0cmluZyxcclxuICAgIGRlcGFydHVyZV90aW1lOiBzdHJpbmcsXHJcbiAgfSkge1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cChgL2JhY2tlbmQvYXBpL3NlbGZTYXZlUmVjb3JkYCwgJ1BPU1QnLCB7IGRhdGE6IGRhdGEgfSwgJ2F1dGhvcml0eScpXHJcbiAgfVxyXG4gIHB1YmxpYyBuZXdBY2NvdW50MihkYXRhOiB7XHJcbiAgICB3YXN0ZV9nbGFzczogbnVtYmVyIHwgc3RyaW5nLFxyXG4gICAgd2FzdGVfcGxhc3RpYzogbnVtYmVyIHwgc3RyaW5nLFxyXG4gICAgd2FzdGVfd29vZDogbnVtYmVyIHwgc3RyaW5nLFxyXG4gICAgd2FzdGVfcGFwZXI6IG51bWJlciB8IHN0cmluZyxcclxuICAgIHdhc3RlX2VsZWN0cm9uaWM6IG51bWJlciB8IHN0cmluZyxcclxuICAgIHdhc3RlX2Nsb3RoZXM6IG51bWJlciB8IHN0cmluZyxcclxuICAgIHdhc3RlX21ldGFsOiBudW1iZXIgfCBzdHJpbmcsXHJcbiAgICB3YXN0ZV9vdGhlcjogbnVtYmVyIHwgc3RyaW5nLFxyXG4gICAgZGVwYXJ0dXJlX3RpbWU6IHN0cmluZyxcclxuICB9KSB7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwKGAvYmFja2VuZC9hcGkvc2VsZlNhdmVSZWNvcmRgLCAnUE9TVCcsIHsgZGF0YTogZGF0YSB9LCAnYXV0aG9yaXR5JylcclxuICB9XHJcbiAgcHVibGljIG5ld0FjY291bnQzKGRhdGE6IHtcclxuICAgIHdhc3RlX2RyeTogc3RyaW5nLFxyXG4gICAgd2FzdGVfd2V0OiBzdHJpbmcsXHJcbiAgICB3YXN0ZV9yZWN5Y2xhYmw6IHN0cmluZyxcclxuICAgIHdhc3RlX2FyY2hpdGVjdHVyZTogc3RyaW5nLFxyXG4gICAgd2FzdGVfaGFybWZ1bDogc3RyaW5nLFxyXG4gICAgZGVwYXJ0dXJlX3RpbWU6IHN0cmluZyxcclxuICAgIHdhc3RlX2dsYXNzOiBudW1iZXIgfCBzdHJpbmcsXHJcbiAgICB3YXN0ZV9wbGFzdGljOiBudW1iZXIgfCBzdHJpbmcsXHJcbiAgICB3YXN0ZV93b29kOiBudW1iZXIgfCBzdHJpbmcsXHJcbiAgICB3YXN0ZV9wYXBlcjogbnVtYmVyIHwgc3RyaW5nLFxyXG4gICAgd2FzdGVfZWxlY3Ryb25pYzogbnVtYmVyIHwgc3RyaW5nLFxyXG4gICAgd2FzdGVfY2xvdGhlczogbnVtYmVyIHwgc3RyaW5nLFxyXG4gICAgd2FzdGVfbWV0YWw6IG51bWJlciB8IHN0cmluZyxcclxuICAgIHdhc3RlX290aGVyOiBudW1iZXIgfCBzdHJpbmcsXHJcbiAgfSkge1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cChgL2JhY2tlbmQvYXBpL3NlbGZTYXZlUmVjb3JkYCwgJ1BPU1QnLCB7IGRhdGE6IGRhdGEgfSwgJ2F1dGhvcml0eScpXHJcbiAgfVxyXG5cclxuICAvLyDlkI7lj7BcclxuICAvKipcclxuICAgKiBnZXRBbmFseXNpc0RhdGFcclxuICAgKiDojrflj5bmlbTmlLnmlbDph49cclxuICAgKiDlkI7lj7DpppbpobVcclxuICAgKi9cclxuICBwdWJsaWMgZ2V0QW5hbHlzaXNEYXRhKHR5cGU/OiBtYWluVHlwZSkge1xyXG4gICAgbGV0IHR5cGVOdW1iZXI6IG51bWJlciB8IHN0cmluZyA9IDBcclxuICAgIHR5cGVOdW1iZXIgPSB0aGlzLnR5cGVIYW5kbGUodHlwZSlcclxuICAgIHJldHVybiB0aGlzLmh0dHAoJy9iYWNrZW5kL2FwaS9hbmFseXNpc0RhdGEnLCBcIkdFVFwiLCB7IGRhdGE6IHsgdHlwZTogdHlwZU51bWJlciB9IH0sICdhdXRob3JpdHknKVxyXG4gIH1cclxuICBwdWJsaWMgc2V0RmVlZGJhY2tUeXBlKHR5cGU6IG1haW5UeXBlKSB7XHJcbiAgICB3eC5zZXRTdG9yYWdlU3luYygnZmVlZGJhY2tUeXBlJywgdHlwZSlcclxuICB9XHJcbiAgcHVibGljIGdldFBvaW50cyh0eXBlPzogbWFpblR5cGUpIHtcclxuICAgIGxldCB0eXBlTnVtYmVyOiBudW1iZXIgfCBzdHJpbmcgPSAwXHJcbiAgICB0eXBlTnVtYmVyID0gdGhpcy50eXBlSGFuZGxlKHR5cGUpXHJcbiAgICByZXR1cm4gdGhpcy5odHRwKCcvYmFja2VuZC94Y3gvcmF0ZURhdGEnLCBcIkdFVFwiLCB7IGRhdGE6IHsgdHlwZTogdHlwZU51bWJlciB9IH0sICdhdXRob3JpdHknKVxyXG4gIH1cclxuICAvKipcclxuICAgKiBnZXRGZWVkYmFja0xpc3RcclxuICAgKiDojrflj5bmlbTmlLnlj43ppojliJfooahcclxuICAgKi9cclxuICBwdWJsaWMgZ2V0RmVlZGJhY2tMaXN0KHVwRGF0YToge1xyXG4gICAgdHlwZTogbWFpblR5cGUgfCBudW1iZXIsXHJcbiAgICBzdGF0dXM6ICdhbGwnIHwgJ3BlbmRpbmcnIHwgJ25vdHlldCcgfCAnZG9uZScgfCBudW1iZXIgfCBzdHJpbmcsXHJcbiAgICBwYWdlOiBudW1iZXIgfCBzdHJpbmcsXHJcbiAgICBuYW1lPzogc3RyaW5nLFxyXG4gICAgcGFnZVNpemU/OiBudW1iZXIsXHJcbiAgICBkZWZ1Y3RfaWQ/OiBudW1iZXIgfCBzdHJpbmcsXHJcbiAgICBjYXRlZ29yeV9pZD86IG51bWJlciB8IHN0cmluZ1xyXG4gIH0pIHtcclxuICAgIGxldCB0eXBlTnVtYmVyID0gMFxyXG4gICAgbGV0IHN0YXR1c0NvZGU6IG51bWJlciB8IHN0cmluZyA9IDBcclxuICAgIHR5cGVOdW1iZXIgPSB0aGlzLnR5cGVIYW5kbGUodXBEYXRhLnR5cGUpXHJcbiAgICBzd2l0Y2ggKHVwRGF0YS5zdGF0dXMpIHtcclxuICAgICAgY2FzZSAnYWxsJzpcclxuICAgICAgICBzdGF0dXNDb2RlID0gJydcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAncGVuZGluZyc6XHJcbiAgICAgICAgc3RhdHVzQ29kZSA9IDJcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAnbm90eWV0JzpcclxuICAgICAgICBzdGF0dXNDb2RlID0gLTFcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAnZG9uZSc6XHJcbiAgICAgICAgc3RhdHVzQ29kZSA9IDFcclxuICAgICAgICBicmVhaztcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICBicmVhaztcclxuICAgIH1cclxuICAgIHVwRGF0YS50eXBlID0gdHlwZU51bWJlclxyXG4gICAgdXBEYXRhLnBhZ2VTaXplID0gMTBcclxuICAgIHVwRGF0YS5zdGF0dXMgPSBzdGF0dXNDb2RlXHJcbiAgICBjb25zb2xlLmxvZyh1cERhdGEpXHJcbiAgICAvLyBwYWdlU2l6ZToxMCx0eXBlOnR5cGVOdW1iZXIsc3RhdHVzOnN0YXR1c0NvZGU/c3RhdHVzQ29kZTonJyxwYWdlOmRhdGEucGFnZSxuYW1lOmRhdGEubmFtZT9kYXRhLm5hbWU6JydcclxuICAgIHJldHVybiB0aGlzLmh0dHAoYC9iYWNrZW5kL2FwaS9hbmFseXNpc0xpc3RgLCAnR0VUJywgeyBkYXRhOiB1cERhdGEgfSwgJ2F1dGhvcml0eScpXHJcbiAgfVxyXG4gIC8qKlxyXG4gICAqIHVwRmVlZGJhY2tcclxuICAgKiDkuIrkvKDlj43ppohcclxuICAgKi9cclxuICBwdWJsaWMgdXBGZWVkYmFjayhkYXRhOiB7XHJcbiAgICBmZWVkYmFjazogc3RyaW5nLFxyXG4gICAgaW1hZ2VfdXJsOiBBcnJheTxzdHJpbmc+LFxyXG4gICAgY2F0ZWdvcnlfaWQ6IG51bWJlciB8IHN0cmluZyxcclxuICAgIGRlZnVjdF9pZDogbnVtYmVyIHwgc3RyaW5nLFxyXG4gIH0pIHtcclxuICAgIHJldHVybiB0aGlzLmh0dHAoJy9iYWNrZW5kL2FwaS9kb0FjdGlvbkZlZWRiYWNrJywgJ1BPU1QnLCB7IGRhdGE6IGRhdGEgfSwgJ2F1dGhvcml0eScpXHJcbiAgfVxyXG4gIC8qKlxyXG4gICAqIG5ld0FjdGl2aXR5XHJcbiAgICog5Yib5bu65rS75YqoXHJcbiAgICovXHJcbiAgcHVibGljIG5ld0FjdGl2aXR5KGRhdGE6IHtcclxuICAgIHRpdGxlOiBzdHJpbmcsXHJcbiAgICBpbWFnZV91cmw6IEFycmF5PHN0cmluZz4sXHJcbiAgICBhY3Rpdml0eV90eXBlOiBudW1iZXIgfCBzdHJpbmcsXHJcbiAgICBzdGFydF90aW1lOiBzdHJpbmcsXHJcbiAgICBjb250ZW50OiBzdHJpbmcsXHJcbiAgfSkge1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cChgL2JhY2tlbmQvYXBpL2FjdGl2aXR5L2NyZWF0ZWAsICdQT1NUJywgeyBkYXRhOiBkYXRhIH0sICdhdXRob3JpdHknKVxyXG4gIH1cclxuICAvKipcclxuICAgKiBnZXRTdW1tYXJ5XHJcbiAgICog6I635Y+W6Zeu6aKY5rGH5oC75pWw5o2uXHJcbiAgICovXHJcbiAgcHVibGljIGdldFN1bW1hcnkodHlwZTogbWFpblR5cGV8c3RyaW5nLHBhZ2U6YW55LCBzaXplOmFueSkge1xyXG4gICAgbGV0IHR5cGVudW1iZXIgPSB0aGlzLnR5cGVIYW5kbGUodHlwZSlcclxuICAgIHJldHVybiB0aGlzLmh0dHAoJy9iYWNrZW5kL3hjeC9xdWVzdGlvblJhbmtpbmcnLCAnR0VUJywgeyBkYXRhOiB7IHR5cGU6IHR5cGVudW1iZXIsIHBhZ2U6IHBhZ2UsIHBhZ2VTaXplOiBzaXplIH0gfSwgJ2F1dGhvcml0eScpXHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiByZWN0aWZpY2F0aW9uXHJcbiAgICog6Zeu6aKY5YiG5p6QLemXrumimOaxh+aAu1xyXG4gICAqL1xyXG4gIHB1YmxpYyByZWN0aWZpY2F0aW9uKHR5cGU6IG1haW5UeXBlfHN0cmluZykge1xyXG4gICAgbGV0IHR5cGVudW1iZXIgPSB0aGlzLnR5cGVIYW5kbGUodHlwZSlcclxuICAgIHJldHVybiB0aGlzLmh0dHAoJy9iYWNrZW5kL3hjeC9yZWN0aWZpY2F0aW9uJywgJ0dFVCcsIHsgZGF0YTogeyB0eXBlOiB0eXBlbnVtYmVyIH0gfSwgJ2F1dGhvcml0eScpXHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBnZXRSYXRlXHJcbiAgICog6Zeu6aKY5YiG5p6QLei+vuagh+eOh1xyXG4gICAqL1xyXG4gIHB1YmxpYyBnZXRSYXRlKHR5cGU6IG1haW5UeXBlfHN0cmluZykge1xyXG4gICAgbGV0IHR5cGVudW1iZXIgPSB0aGlzLnR5cGVIYW5kbGUodHlwZSlcclxuICAgIHJldHVybiB0aGlzLmh0dHAoJy9iYWNrZW5kL3hjeC95aWVsZCcsICdHRVQnLCB7IGRhdGE6IHsgdHlwZTogdHlwZW51bWJlciB9IH0sICdhdXRob3JpdHknKVxyXG4gIH1cclxuICAvKipcclxuICAgKiBnZXRNYXBcclxuICAgKiDojrflj5blnLDlm77mjqXlj6NcclxuICAgKi9cclxuICBwdWJsaWMgZ2V0TWFwKCkge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLHJlamVjdCk9PntcclxuICAgICAgdGhpcy5odHRwKGB4Y3gvYXBpL21hcGAsJ0dFVCcse30sJ2F1dGhvcml0eScpLnRoZW4oKHJlczphbnkpPT57XHJcbiAgICAgICAgbGV0IG91dFB1dCA9IDxhbnk+W11cclxuICAgICAgICBsZXQgZGF0YSA9IHJlcy5kYXRhLnJlc3VsdFxyXG4gICAgICAgIGRhdGEuZm9yRWFjaCgoZWxlbWVudDphbnksaW5kZXg6bnVtYmVyKSA9PiB7XHJcbiAgICAgICAgICBsZXQgcG9pbnQgPSBlbGVtZW50LmNlbnRlci5zcGxpdCgnLCcpXHJcbiAgICAgICAgICBsZXQgIGxvbmdpdHVkZSA9IHBvaW50WzBdXHJcbiAgICAgICAgICBsZXQgIGxhdGl0dWRlID0gcG9pbnRbMV1cclxuICAgICAgICAgIG91dFB1dC5wdXNoKHtcclxuICAgICAgICAgICAgaWQ6aW5kZXgsXHJcbiAgICAgICAgICAgIHdpZHRoOjIwLFxyXG4gICAgICAgICAgICBoZWlnaHQ6MjAsXHJcbiAgICAgICAgICAgIGxhdGl0dWRlLFxyXG4gICAgICAgICAgICBsb25naXR1ZGUsXHJcbiAgICAgICAgICAgIGljb25QYXRoOiAnL3N0YXRpYy9tYXJrZXJIb21lLnBuZycsXHJcbiAgICAgICAgICAgIGxpc3Q6ZWxlbWVudC5saXN0LFxyXG4gICAgICAgICAgICBjdXN0b21DYWxsb3V0OiB7XHJcbiAgICAgICAgICAgICAgYW5jaG9yWTogMTAsXHJcbiAgICAgICAgICAgICAgYW5jaG9yWDogMTAsXHJcbiAgICAgICAgICAgICAgZGlzcGxheTogJ0JZQ0xJQ0snLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgfSlcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXNvbHZlKG91dFB1dClcclxuICAgICAgfSwoZXJyKT0+e1xyXG4gICAgICAgIHJlamVjdChlcnIpXHJcbiAgICAgIH0pXHJcbiAgICB9KSBcclxuICB9XHJcbn1cclxuY29uc3QgYXBpID0gbmV3IEFQSVxyXG5leHBvcnQgZGVmYXVsdCBhcGlcclxuXHJcblxyXG5cclxuXHJcblxyXG4vLyBleHBvcnQgZGVmYXVsdCBhcGk7Il19