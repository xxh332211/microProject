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
                    console.log('111', e);
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
                url: 'https://file.021xzy.com/file/v2.0/uploadImage',
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
    getCommunityDetail2() {
        return this.http('/backend/xcx/SubDistrictDetail', "GET", {}, 'authority');
    }
    getCoordinateMsg(address) {
        console.log('123', address);
        return this.http('/xcx/api/loaction', "GET", { data: { address: encodeURI(address) } }, 'authority');
    }
    jcEdit(data) {
        return this.http(`/backend/api/sub_district/update`, 'POST', { data: data }, 'authority');
    }
    byEdit(data) {
        return this.http(`/backend/api/addCar`, 'POST', { data: data }, 'authority');
    }
    ljxfEdit(data) {
        return this.http(`/backend/api/addWingRoom`, 'POST', { data: data }, 'authority');
    }
    deleteBy(data) {
        return this.http(`/backend/api/addCar`, 'POST', { data: data }, 'authority');
    }
    deleteLjxf(data) {
        return this.http(`/backend/api/wingRoomUpdate`, 'POST', { data: data }, 'authority');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmV0LnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJuZXQuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBLE1BQU0sVUFBVSxHQUFHLENBQUMsR0FBUSxFQUFFLEVBQUU7SUFDOUIsUUFBUSxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRTtRQUNyQixLQUFLLEdBQUc7WUFDTixFQUFFLENBQUMsU0FBUyxFQUFFLENBQUM7WUFDZixFQUFFLENBQUMsU0FBUyxDQUFDO2dCQUNYLEtBQUssRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sSUFBSSxNQUFNO2dCQUNqQyxJQUFJLEVBQUUsTUFBTTtnQkFDWixRQUFRLEVBQUUsSUFBSTthQUNmLENBQUMsQ0FBQTtZQUNGLE1BQU07UUFDUixLQUFLLEdBQUc7WUFDTixFQUFFLENBQUMsU0FBUyxFQUFFLENBQUM7WUFDZixFQUFFLENBQUMsVUFBVSxDQUFDLEVBQUUsR0FBRyxFQUFFLG9CQUFvQixFQUFFLENBQUMsQ0FBQTtZQUM1QyxNQUFNO1FBQ1I7WUFDRSxFQUFFLENBQUMsU0FBUyxDQUFDO2dCQUNYLEtBQUssRUFBRSxNQUFNO2dCQUNiLElBQUksRUFBRSxNQUFNO2dCQUNaLFFBQVEsRUFBRSxJQUFJO2FBQ2YsQ0FBQyxDQUFBO1lBQ0YsRUFBRSxDQUFDLFNBQVMsRUFBRSxDQUFDO1lBQ2YsTUFBTTtLQUNUO0FBQ0gsQ0FBQyxDQUFDO0FBQ0YsTUFBTSxhQUFhLEdBQUcsQ0FBQyxHQUFRLEVBQUUsRUFBRTtJQUNqQyxRQUFRLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFO1FBQ3JCLEtBQUssR0FBRztZQUNOLEVBQUUsQ0FBQyxTQUFTLEVBQUUsQ0FBQztZQUNmLE1BQU07UUFDUixLQUFLLEdBQUc7WUFDTixFQUFFLENBQUMsU0FBUyxFQUFFLENBQUM7WUFDZixFQUFFLENBQUMsU0FBUyxDQUFDO2dCQUNYLEtBQUssRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sSUFBSSxNQUFNO2dCQUNqQyxJQUFJLEVBQUUsTUFBTTtnQkFDWixRQUFRLEVBQUUsSUFBSTthQUNmLENBQUMsQ0FBQTtZQUNGLE1BQU07UUFDUixLQUFLLEdBQUc7WUFDTixFQUFFLENBQUMsU0FBUyxFQUFFLENBQUM7WUFDZixFQUFFLENBQUMsVUFBVSxDQUFDLEVBQUUsR0FBRyxFQUFFLG9CQUFvQixFQUFFLENBQUMsQ0FBQTtZQUM1QyxNQUFNO1FBQ1I7WUFDRSxFQUFFLENBQUMsU0FBUyxFQUFFLENBQUM7WUFDZixNQUFNO0tBQ1Q7QUFDSCxDQUFDLENBQUE7QUFnQkQsTUFBTSxHQUFHO0lBc0VQO1FBckVRLFNBQUksR0FBRyw2QkFBNkIsQ0FBQztJQXFFN0IsQ0FBQztJQWpFVCxJQUFJLENBQUMsR0FBVyxFQUFFLElBQThGLEVBQUUsTUFBb0MsRUFBRSxTQUF1QjtRQUNyTCxJQUFJLEtBQUssR0FBRyxFQUFFLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFBO1FBQ3RDLElBQUksS0FBSyxHQUFRLE1BQU0sQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDO1FBQ25DLElBQUksT0FBTyxHQUFRLE1BQU0sQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDO1FBQ3JDLElBQUksU0FBUyxLQUFLLFdBQVcsRUFBRTtZQUM3QixPQUFPLG1CQUFLLEtBQUssRUFBRSxLQUFLLElBQUssT0FBTyxDQUFFLENBQUE7U0FDdkM7UUFDRCxFQUFFLENBQUMsU0FBUyxDQUFDO1lBQ1gsS0FBSyxFQUFFLEtBQUs7WUFDWixJQUFJLEVBQUUsU0FBUztZQUNmLFFBQVEsRUFBRSxJQUFJO1NBQ2YsQ0FBQyxDQUFBO1FBQ0YsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUNyQyxFQUFFLENBQUMsT0FBTyxDQUFDO2dCQUNULEdBQUcsRUFBRSxJQUFJLENBQUMsSUFBSSxHQUFHLEdBQUc7Z0JBQ3BCLE1BQU0sRUFBRSxJQUFJO2dCQUNaLElBQUksRUFBRSxLQUFLO2dCQUNYLE9BQU8sRUFBRSxJQUFJO2dCQUNiLE1BQU0sa0JBQ0osY0FBYyxFQUFFLGtCQUFrQixFQUNsQyw4QkFBOEIsRUFBRSwrREFBK0QsRUFDL0YsNkJBQTZCLEVBQUUsb0JBQW9CLEVBQ25ELDZCQUE2QixFQUFFLEdBQUcsSUFDL0IsT0FBTyxDQUNYO2dCQUNELFFBQVEsQ0FBQyxDQUFNO29CQUNiLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO29CQUN0QixJQUFJLENBQUMsQ0FBQyxVQUFVLEtBQUssR0FBRyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLEdBQUcsRUFBRTt3QkFDL0MsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUNqQixPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7cUJBQ1o7eUJBQU07d0JBQ0wsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUNkLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQTtxQkFDVjtnQkFDSCxDQUFDO2FBQ0YsQ0FBQyxDQUFBO1FBQ0osQ0FBQyxDQUFDLENBQUE7SUFDSixDQUFDO0lBQ08sVUFBVSxDQUFDLElBQXNCO1FBQ3ZDLElBQUksVUFBVSxDQUFBO1FBQ2QsUUFBUSxJQUFJLEVBQUU7WUFDWixLQUFLLFdBQVc7Z0JBQ2QsVUFBVSxHQUFHLENBQUMsQ0FBQTtnQkFDZCxNQUFNO1lBQ1IsS0FBSyxTQUFTO2dCQUNaLFVBQVUsR0FBRyxDQUFDLENBQUE7Z0JBQ2QsTUFBTTtZQUNSLEtBQUssTUFBTTtnQkFDVCxVQUFVLEdBQUcsQ0FBQyxDQUFBO2dCQUNkLE1BQU07WUFDUixLQUFLLFFBQVE7Z0JBQ1gsVUFBVSxHQUFHLENBQUMsQ0FBQTtnQkFDZCxNQUFNO1lBQ1I7Z0JBQ0UsVUFBVSxHQUFHLENBQUMsQ0FBQztnQkFDZixNQUFNO1NBQ1Q7UUFDRCxPQUFPLFVBQVUsQ0FBQTtJQUNuQixDQUFDO0lBSU0sT0FBTztRQUNaLE9BQU8sSUFBSSxJQUFJLEVBQUUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7SUFDL0MsQ0FBQztJQUVELFVBQVU7UUFDUixJQUFJLENBQUMsSUFBSSxDQUFDLHlCQUF5QixFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsV0FBVyxDQUFDLENBQUE7SUFDOUQsQ0FBQztJQUNELEtBQUssQ0FBQyxRQUFnQixFQUFFLFFBQWdCO1FBQ3RDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxNQUFNLEVBQUUsRUFBRSxJQUFJLEVBQUUsRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQTtJQUMzRyxDQUFDO0lBS00sT0FBTyxDQUFDLFlBQThCO1FBQzNDLElBQUksSUFBSSxHQUFHLFlBQVksQ0FBQyxDQUFDLENBQUMsRUFBRSxhQUFhLEVBQUUsWUFBWSxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUE7UUFDbkUsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLHdCQUF3QixFQUFFLEtBQUssRUFBRSxFQUFFLElBQUksa0JBQUksSUFBSSxFQUFFLENBQUMsSUFBSyxJQUFJLENBQUUsRUFBRSxFQUFFLFdBQVcsQ0FBQyxDQUFBO0lBQ2hHLENBQUM7SUFLTSxTQUFTLENBQUMsSUFBYTtRQUM1QixJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQTtRQUMvQixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsNkJBQTZCLEVBQUUsS0FBSyxFQUFFLEVBQUUsSUFBSSxvQkFBTyxJQUFJLENBQUUsRUFBRSxFQUFFLFdBQVcsQ0FBQyxDQUFBO0lBQzVGLENBQUM7SUFFRCxXQUFXLENBQUMsYUFBaUM7UUFDM0MsSUFBSSxTQUFTLEdBQUcsRUFBRSxDQUFBO1FBQ2xCLElBQUksSUFBSSxHQUFHLEVBQUUsQ0FBQTtRQUNiLElBQUksYUFBYSxFQUFFO1lBQ2pCLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQzdCLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRTtvQkFDWCxTQUFTLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQTtpQkFDbkI7cUJBQU07b0JBQ0wsU0FBUyxHQUFHLFNBQVMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFBO2lCQUNoQztZQUNILENBQUMsQ0FBQyxDQUFBO1NBQ0g7UUFDRCxJQUFJLFNBQVMsRUFBRTtZQUNiLElBQUksR0FBRyxFQUFFLGFBQWEsRUFBRSxTQUFTLEVBQUUsQ0FBQTtTQUNwQztRQUVELE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyx3QkFBd0IsRUFBRSxLQUFLLEVBQUUsRUFBRSxJQUFJLGtCQUFJLElBQUksRUFBRSxDQUFDLElBQUssSUFBSSxDQUFFLEVBQUUsRUFBRSxXQUFXLENBQUMsQ0FBQTtJQUNoRyxDQUFDO0lBSUQsa0JBQWtCLENBQUMsYUFBaUM7UUFDbEQsSUFBSSxTQUFTLEdBQUcsRUFBRSxDQUFBO1FBQ2xCLElBQUksSUFBSSxHQUFHLEVBQUUsQ0FBQTtRQUNiLElBQUksYUFBYSxFQUFFO1lBQ2pCLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQzdCLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRTtvQkFDWCxTQUFTLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQTtpQkFDbkI7cUJBQU07b0JBQ0wsU0FBUyxHQUFHLFNBQVMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFBO2lCQUNoQztZQUNILENBQUMsQ0FBQyxDQUFBO1NBQ0g7UUFDRCxJQUFJLFNBQVMsRUFBRTtZQUNiLElBQUksR0FBRyxFQUFFLGFBQWEsRUFBRSxTQUFTLEVBQUUsQ0FBQTtTQUNwQztRQUNELE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyx3QkFBd0IsRUFBRSxLQUFLLEVBQUUsRUFBRSxJQUFJLGtCQUFJLElBQUksRUFBRSxDQUFDLElBQUssSUFBSSxDQUFFLEVBQUUsRUFBRSxXQUFXLENBQUMsQ0FBQTtJQUNoRyxDQUFDO0lBQ0QsV0FBVyxDQUFDLGFBQXVCLEVBQUUsY0FBZ0M7UUFFbkUsSUFBSSxTQUFTLEdBQUcsRUFBRSxDQUFBO1FBQ2xCLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDN0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFO2dCQUNYLFNBQVMsR0FBRyxDQUFDLENBQUE7YUFDZDtpQkFBTTtnQkFDTCxTQUFTLEdBQUcsU0FBUyxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUE7YUFDaEM7UUFDSCxDQUFDLENBQUMsQ0FBQTtRQUNGLElBQUksSUFBSSxHQUFHLEVBQUUsQ0FBQTtRQUNiLElBQUksR0FBRyxjQUFjLENBQUMsQ0FBQyxDQUFDLEVBQUUsY0FBYyxFQUFFLGNBQWMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFBO1FBQ3BFLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyx3QkFBd0IsRUFBRSxLQUFLLEVBQUUsRUFBRSxJQUFJLGtCQUFJLElBQUksRUFBRSxDQUFDLEVBQUUsYUFBYSxFQUFFLFNBQVMsSUFBSyxJQUFJLENBQUUsRUFBRSxFQUFFLFdBQVcsQ0FBQyxDQUFBO0lBQzFILENBQUM7SUFDRCxVQUFVLENBQUMsYUFBdUIsRUFBRSxjQUFnQztRQUVsRSxJQUFJLFNBQVMsR0FBRyxFQUFFLENBQUE7UUFDbEIsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUM3QixJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUU7Z0JBQ1gsU0FBUyxHQUFHLENBQUMsQ0FBQTthQUNkO2lCQUFNO2dCQUNMLFNBQVMsR0FBRyxTQUFTLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQTthQUNoQztRQUNILENBQUMsQ0FBQyxDQUFBO1FBQ0YsSUFBSSxJQUFJLEdBQUcsRUFBRSxDQUFBO1FBQ2IsSUFBSSxHQUFHLGNBQWMsQ0FBQyxDQUFDLENBQUMsRUFBRSxjQUFjLEVBQUUsY0FBYyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUE7UUFDcEUsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLHdCQUF3QixFQUFFLEtBQUssRUFBRSxFQUFFLElBQUksa0JBQUksSUFBSSxFQUFFLENBQUMsRUFBRSxhQUFhLEVBQUUsU0FBUyxJQUFLLElBQUksQ0FBRSxFQUFFLEVBQUUsV0FBVyxDQUFDLENBQUE7SUFDMUgsQ0FBQztJQUVELGNBQWMsQ0FBQyxJQUFZO1FBQ3pCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyx3QkFBd0IsRUFBRSxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxFQUFFLFdBQVcsQ0FBQyxDQUFBO0lBQzlHLENBQUM7SUFHRCxhQUFhLENBQUMsSUFBWTtRQUN4QixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsd0JBQXdCLEVBQUUsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsRUFBRSxXQUFXLENBQUMsQ0FBQTtJQUM5RyxDQUFDO0lBS00sVUFBVSxDQUFDLElBQVk7UUFDNUIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLHdCQUF3QixFQUFFLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLEVBQUUsV0FBVyxDQUFDLENBQUE7SUFDOUcsQ0FBQztJQUtNLG9CQUFvQixDQUFDLGNBQStCO1FBQ3pELE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxpQ0FBaUMsRUFBRSxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLGNBQWMsRUFBRSxFQUFFLEVBQUUsV0FBVyxDQUFDLENBQUE7SUFDaEgsQ0FBQztJQUtNLG1CQUFtQixDQUFDLGNBQStCO1FBQ3hELE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxpQ0FBaUMsRUFBRSxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLGNBQWMsRUFBRSxFQUFFLEVBQUUsV0FBVyxDQUFDLENBQUE7SUFDaEgsQ0FBQztJQUtNLGtCQUFrQjtRQUN2QixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsaUNBQWlDLEVBQUUsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsV0FBVyxDQUFDLENBQUE7SUFDaEcsQ0FBQztJQUtNLGdCQUFnQixDQUFDLFlBQTZCO1FBQ25ELE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxpQ0FBaUMsRUFBRSxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLFlBQVksRUFBRSxFQUFFLEVBQUUsV0FBVyxDQUFDLENBQUE7SUFDOUcsQ0FBQztJQU1NLG9CQUFvQixDQUFDLFVBQXNCO1FBQ2hELE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRTtZQUM3QixFQUFFLENBQUMsY0FBYyxDQUFDLGFBQWEsR0FBRyxVQUFVLENBQUMsSUFBSSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1lBQy9ELE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUNmLENBQUMsQ0FBQyxDQUFBO0lBQ0osQ0FBQztJQUtNLG1CQUFtQixDQUFDLElBQVk7UUFDckMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFO1lBQzdCLE9BQU8sQ0FBQyxFQUFFLENBQUMsY0FBYyxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFBO1FBQ2xELENBQUMsQ0FBQyxDQUFBO0lBQ0osQ0FBQztJQUtNLGVBQWUsQ0FBQyxJQUFTO1FBQzlCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxpQ0FBaUMsRUFBRSxNQUFNLEVBQUUsRUFBRSxJQUFJLG9CQUFPLElBQUksSUFBRSxJQUFJLEVBQUUsQ0FBQyxHQUFFLEVBQUUsRUFBRSxXQUFXLENBQUMsQ0FBQTtJQUMxRyxDQUFDO0lBS00sY0FBYyxDQUFDLElBQVM7UUFDN0IsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLGlDQUFpQyxFQUFFLE1BQU0sRUFBRSxFQUFFLElBQUksb0JBQU8sSUFBSSxJQUFFLElBQUksRUFBRSxDQUFDLEdBQUUsRUFBRSxFQUFFLFdBQVcsQ0FBQyxDQUFBO0lBQzFHLENBQUM7SUFLTSxXQUFXLENBQUMsSUFBUztRQUMxQixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsaUNBQWlDLEVBQUUsTUFBTSxFQUFFLEVBQUUsSUFBSSxvQkFBTyxJQUFJLElBQUUsSUFBSSxFQUFFLENBQUMsR0FBRSxFQUFFLEVBQUUsV0FBVyxDQUFDLENBQUE7SUFDMUcsQ0FBQztJQUtNLFVBQVUsQ0FBQyxPQUFlO1FBQy9CLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDckMsSUFBSSxPQUFPLENBQUMsT0FBTyxDQUFDLHlCQUF5QixDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUU7Z0JBRW5ELElBQUksSUFBSSxHQUFHO29CQUNULElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsVUFBVSxFQUFFLENBQUMsRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxDQUFDO2lCQUNoRSxDQUFBO2dCQUNELE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQTtnQkFDYixPQUFPO2FBQ1I7WUFDRCxFQUFFLENBQUMsVUFBVSxDQUFDO2dCQUVaLEdBQUcsRUFBRSwrQ0FBK0M7Z0JBQ3BELFFBQVEsRUFBRSxPQUFPO2dCQUNqQixJQUFJLEVBQUUsTUFBTTtnQkFDWixPQUFPLEVBQUUsSUFBSTtnQkFDYixNQUFNLEVBQUU7b0JBQ04sT0FBTyxFQUFFLEVBQUUsQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDO29CQUNuQyxjQUFjLEVBQUUscUJBQXFCO29CQUNyQyw4QkFBOEIsRUFBRSwrREFBK0Q7b0JBQy9GLDZCQUE2QixFQUFFLG9CQUFvQjtvQkFDbkQsNkJBQTZCLEVBQUUsR0FBRztpQkFDbkM7Z0JBQ0QsT0FBTyxDQUFDLEdBQUc7b0JBQ1QsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUNuQixPQUFPLENBQUMsR0FBRyxDQUFDLENBQUE7Z0JBQ2QsQ0FBQztnQkFDRCxJQUFJLENBQUMsQ0FBQztvQkFDSixFQUFFLENBQUMsU0FBUyxDQUFDO3dCQUNYLEtBQUssRUFBRSxRQUFRO3dCQUNmLElBQUksRUFBRSxNQUFNO3dCQUNaLFFBQVEsRUFBRSxJQUFJO3FCQUNmLENBQUMsQ0FBQztvQkFDSCxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ1osQ0FBQzthQUNGLENBQUMsQ0FBQTtRQUNKLENBQUMsQ0FBQyxDQUFBO0lBQ0osQ0FBQztJQUVNLFVBQVUsQ0FBQyxNQUFrQjtRQUNsQyxPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBQ3JDLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQTtZQUNiLElBQUksSUFBSSxHQUFHLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFBO1lBQzVCLElBQUksTUFBTSxHQUFRLEVBQUUsQ0FBQTtZQUNwQixFQUFFLENBQUMsV0FBVyxDQUFDLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUE7WUFDaEMsSUFBSSxFQUFFLEdBQUcsR0FBRyxFQUFFO2dCQUNaLElBQUksS0FBSyxJQUFJLElBQUksRUFBRTtvQkFDakIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxJQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQVEsRUFBRSxFQUFFO3dCQUNwRSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQTt3QkFDMUQsS0FBSyxHQUFHLEtBQUssR0FBRyxDQUFDLENBQUE7d0JBQ2pCLEVBQUUsRUFBRSxDQUFDO29CQUNQLENBQUMsRUFBRSxDQUFDLEdBQVEsRUFBRSxFQUFFO3dCQUNkLEVBQUUsQ0FBQyxXQUFXLEVBQUUsQ0FBQTt3QkFDaEIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFBO29CQUNiLENBQUMsQ0FBQyxDQUFBO2lCQUNIO3FCQUFNO29CQUNMLEVBQUUsQ0FBQyxXQUFXLEVBQUUsQ0FBQTtvQkFDaEIsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFBO2lCQUNoQjtZQUNILENBQUMsQ0FBQTtZQUNELEVBQUUsRUFBRSxDQUFDO1FBQ1AsQ0FBQyxDQUFDLENBQUE7SUFDSixDQUFDO0lBTU0sU0FBUyxDQUFDLElBQWM7UUFDN0IsSUFBSSxLQUFLLEdBQW9CLENBQUMsQ0FBQTtRQUM5QixLQUFLLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUM3QixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsNkJBQTZCLEVBQUUsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsV0FBVyxDQUFDLENBQUE7SUFDaEcsQ0FBQztJQUtNLGFBQWEsQ0FBQyxJQUFzQjtRQUN6QyxFQUFFLENBQUMsY0FBYyxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsQ0FBQTtJQUN2QyxDQUFDO0lBS00sYUFBYSxDQUFDLElBQXdFO1FBQzNGLEVBQUUsQ0FBQyxjQUFjLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxDQUFBO0lBQ3ZDLENBQUM7SUFLTSxnQkFBZ0IsQ0FBQyxNQUl2QjtRQUNDLElBQUksVUFBVSxHQUFvQixDQUFDLENBQUE7UUFDbkMsVUFBVSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFBO1FBQ3pDLE1BQU0sQ0FBQyxJQUFJLEdBQUcsVUFBVSxDQUFBO1FBQ3hCLE1BQU0sQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDLElBQUksSUFBSSxDQUFDLENBQUE7UUFDOUIsTUFBTSxDQUFDLFFBQVEsR0FBRyxNQUFNLENBQUMsUUFBUSxJQUFJLEVBQUUsQ0FBQTtRQUN2QyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsMkJBQTJCLEVBQUUsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxFQUFFLFdBQVcsQ0FBQyxDQUFBO0lBQ3JGLENBQUM7SUFJTSxrQkFBa0IsQ0FBQyxNQUV6QjtRQUNDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxnQ0FBZ0MsRUFBRSxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEVBQUUsV0FBVyxDQUFDLENBQUE7SUFDMUYsQ0FBQztJQUNNLG1CQUFtQjtRQUN4QixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsZ0NBQWdDLEVBQUUsS0FBSyxFQUFFLEVBQUcsRUFBRSxXQUFXLENBQUMsQ0FBQTtJQUM3RSxDQUFDO0lBRU0sZ0JBQWdCLENBQUMsT0FBZTtRQUNyQyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsQ0FBQTtRQUczQixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsbUJBQW1CLEVBQUUsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLEVBQUUsT0FBTyxFQUFFLFNBQVMsQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFLEVBQUUsV0FBVyxDQUFDLENBQUE7SUFDdEcsQ0FBQztJQUtNLE1BQU0sQ0FBQyxJQVViO1FBQ0MsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLGtDQUFrQyxFQUFFLE1BQU0sRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsRUFBRSxXQUFXLENBQUMsQ0FBQTtJQUMzRixDQUFDO0lBQ00sTUFBTSxDQUFDLElBT2I7UUFDQyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMscUJBQXFCLEVBQUUsTUFBTSxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxFQUFFLFdBQVcsQ0FBQyxDQUFBO0lBQzlFLENBQUM7SUFDTSxRQUFRLENBQUMsSUFTZjtRQUNDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQywwQkFBMEIsRUFBRSxNQUFNLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEVBQUUsV0FBVyxDQUFDLENBQUE7SUFDbkYsQ0FBQztJQUVNLFFBQVEsQ0FBQyxJQUlmO1FBQ0MsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLHFCQUFxQixFQUFFLE1BQU0sRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsRUFBRSxXQUFXLENBQUMsQ0FBQTtJQUM5RSxDQUFDO0lBRU0sVUFBVSxDQUFDLElBSWpCO1FBQ0MsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLDZCQUE2QixFQUFFLE1BQU0sRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsRUFBRSxXQUFXLENBQUMsQ0FBQTtJQUN0RixDQUFDO0lBS00sYUFBYSxDQUFDLE1BSXBCO1FBQ0MsSUFBSSxVQUFVLEdBQW9CLENBQUMsQ0FBQTtRQUNuQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDekMsTUFBTSxDQUFDLElBQUksR0FBRyxVQUFVLENBQUE7UUFDeEIsTUFBTSxDQUFDLElBQUksR0FBRyxNQUFNLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQTtRQUM5QixNQUFNLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQyxRQUFRLElBQUksRUFBRSxDQUFBO1FBQ3ZDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyx5QkFBeUIsRUFBRSxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEVBQUUsV0FBVyxDQUFDLENBQUE7SUFDbkYsQ0FBQztJQUtNLHFCQUFxQjtRQUMxQixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsNkJBQTZCLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxXQUFXLENBQUMsQ0FBQTtJQUN6RSxDQUFDO0lBR00sY0FBYztRQUNuQixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsOEJBQThCLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxXQUFXLENBQUMsQ0FBQTtJQUMxRSxDQUFDO0lBRU0sU0FBUyxDQUFDLE1BSWQ7UUFDQyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMseUJBQXlCLEVBQUUsTUFBTSxFQUFFLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBQyxFQUFFLFdBQVcsQ0FBQyxDQUFBO0lBQ2xGLENBQUM7SUFFSSxRQUFRLENBQUMsTUFFYjtRQUNDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyw0QkFBNEIsRUFBRSxNQUFNLEVBQUUsRUFBQyxJQUFJLEVBQUUsTUFBTSxFQUFDLEVBQUUsV0FBVyxDQUFDLENBQUE7SUFDdkYsQ0FBQztJQUVNLFVBQVUsQ0FBQyxJQU9qQjtRQUNDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyw2QkFBNkIsRUFBRSxNQUFNLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEVBQUUsV0FBVyxDQUFDLENBQUE7SUFDdEYsQ0FBQztJQUNNLFdBQVcsQ0FBQyxJQVVsQjtRQUNDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyw2QkFBNkIsRUFBRSxNQUFNLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEVBQUUsV0FBVyxDQUFDLENBQUE7SUFDdEYsQ0FBQztJQUNNLFdBQVcsQ0FBQyxJQWVsQjtRQUNDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyw2QkFBNkIsRUFBRSxNQUFNLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEVBQUUsV0FBVyxDQUFDLENBQUE7SUFDdEYsQ0FBQztJQVFNLGVBQWUsQ0FBQyxJQUFlO1FBQ3BDLElBQUksVUFBVSxHQUFvQixDQUFDLENBQUE7UUFDbkMsVUFBVSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDbEMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLDJCQUEyQixFQUFFLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsRUFBRSxFQUFFLFdBQVcsQ0FBQyxDQUFBO0lBQ25HLENBQUM7SUFDTSxlQUFlLENBQUMsSUFBYztRQUNuQyxFQUFFLENBQUMsY0FBYyxDQUFDLGNBQWMsRUFBRSxJQUFJLENBQUMsQ0FBQTtJQUN6QyxDQUFDO0lBQ00sU0FBUyxDQUFDLElBQWU7UUFDOUIsSUFBSSxVQUFVLEdBQW9CLENBQUMsQ0FBQTtRQUNuQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUNsQyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsdUJBQXVCLEVBQUUsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxFQUFFLEVBQUUsV0FBVyxDQUFDLENBQUE7SUFDL0YsQ0FBQztJQUtNLGVBQWUsQ0FBQyxNQVV0QjtRQUNDLElBQUksVUFBVSxHQUFHLENBQUMsQ0FBQTtRQUNsQixJQUFJLFVBQVUsR0FBb0IsQ0FBQyxDQUFBO1FBQ25DLFVBQVUsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUN6QyxRQUFRLE1BQU0sQ0FBQyxNQUFNLEVBQUU7WUFDckIsS0FBSyxLQUFLO2dCQUNSLFVBQVUsR0FBRyxFQUFFLENBQUE7Z0JBQ2YsTUFBTTtZQUNSLEtBQUssU0FBUztnQkFDWixVQUFVLEdBQUcsQ0FBQyxDQUFBO2dCQUNkLE1BQU07WUFDUixLQUFLLFFBQVE7Z0JBQ1gsVUFBVSxHQUFHLENBQUMsQ0FBQyxDQUFBO2dCQUNmLE1BQU07WUFDUixLQUFLLE1BQU07Z0JBQ1QsVUFBVSxHQUFHLENBQUMsQ0FBQTtnQkFDZCxNQUFNO1lBQ1I7Z0JBQ0UsTUFBTTtTQUNUO1FBQ0QsTUFBTSxDQUFDLElBQUksR0FBRyxVQUFVLENBQUE7UUFDeEIsTUFBTSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUE7UUFDcEIsTUFBTSxDQUFDLE1BQU0sR0FBRyxVQUFVLENBQUE7UUFDMUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQTtRQUVuQixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsMkJBQTJCLEVBQUUsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxFQUFFLFdBQVcsQ0FBQyxDQUFBO0lBQ3JGLENBQUM7SUFLTSxVQUFVLENBQUMsSUFLakI7UUFDQyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsK0JBQStCLEVBQUUsTUFBTSxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxFQUFFLFdBQVcsQ0FBQyxDQUFBO0lBQ3hGLENBQUM7SUFLTSxXQUFXLENBQUMsSUFNbEI7UUFDQyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsOEJBQThCLEVBQUUsTUFBTSxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxFQUFFLFdBQVcsQ0FBQyxDQUFBO0lBQ3ZGLENBQUM7SUFLTSxVQUFVLENBQUMsSUFBcUIsRUFBQyxJQUFRLEVBQUUsSUFBUTtRQUN4RCxJQUFJLFVBQVUsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFBO1FBQ3RDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyw4QkFBOEIsRUFBRSxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsV0FBVyxDQUFDLENBQUE7SUFDbEksQ0FBQztJQU1NLGFBQWEsQ0FBQyxJQUFxQjtRQUN4QyxJQUFJLFVBQVUsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFBO1FBQ3RDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyw0QkFBNEIsRUFBRSxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLEVBQUUsRUFBRSxXQUFXLENBQUMsQ0FBQTtJQUNwRyxDQUFDO0lBTU0sT0FBTyxDQUFDLElBQXFCO1FBQ2xDLElBQUksVUFBVSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDdEMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLG9CQUFvQixFQUFFLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsRUFBRSxFQUFFLFdBQVcsQ0FBQyxDQUFBO0lBQzVGLENBQUM7SUFLTSxNQUFNO1FBQ1gsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBQyxNQUFNLEVBQUMsRUFBRTtZQUNuQyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBQyxLQUFLLEVBQUMsRUFBRSxFQUFDLFdBQVcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQU8sRUFBQyxFQUFFO2dCQUM1RCxJQUFJLE1BQU0sR0FBUSxFQUFFLENBQUE7Z0JBQ3BCLElBQUksSUFBSSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFBO2dCQUMxQixJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsT0FBVyxFQUFDLEtBQVksRUFBRSxFQUFFO29CQUN4QyxJQUFJLEtBQUssR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQTtvQkFDckMsSUFBSyxTQUFTLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFBO29CQUN6QixJQUFLLFFBQVEsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUE7b0JBQ3hCLE1BQU0sQ0FBQyxJQUFJLENBQUM7d0JBQ1YsRUFBRSxFQUFDLEtBQUs7d0JBQ1IsS0FBSyxFQUFDLEVBQUU7d0JBQ1IsTUFBTSxFQUFDLEVBQUU7d0JBQ1QsUUFBUTt3QkFDUixTQUFTO3dCQUNULFFBQVEsRUFBRSx3QkFBd0I7d0JBQ2xDLElBQUksRUFBQyxPQUFPLENBQUMsSUFBSTt3QkFDakIsYUFBYSxFQUFFOzRCQUNiLE9BQU8sRUFBRSxFQUFFOzRCQUNYLE9BQU8sRUFBRSxFQUFFOzRCQUNYLE9BQU8sRUFBRSxTQUFTO3lCQUNuQjtxQkFDRixDQUFDLENBQUE7Z0JBQ0osQ0FBQyxDQUFDLENBQUM7Z0JBQ0gsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFBO1lBQ2pCLENBQUMsRUFBQyxDQUFDLEdBQUcsRUFBQyxFQUFFO2dCQUNQLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQTtZQUNiLENBQUMsQ0FBQyxDQUFBO1FBQ0osQ0FBQyxDQUFDLENBQUE7SUFDSixDQUFDO0NBQ0Y7QUFDRCxNQUFNLEdBQUcsR0FBRyxJQUFJLEdBQUcsQ0FBQTtBQUNuQixrQkFBZSxHQUFHLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBjb25zdCBhcGk6YW55ID0ge307XHJcblxyXG5jb25zdCBmYWlsSGFuZGxlID0gKGVycjogYW55KSA9PiB7XHJcbiAgc3dpdGNoIChlcnIuZGF0YS5jb2RlKSB7XHJcbiAgICBjYXNlIDQwMDpcclxuICAgICAgd3guaGlkZVRvYXN0KCk7XHJcbiAgICAgIHd4LnNob3dUb2FzdCh7XHJcbiAgICAgICAgdGl0bGU6IGVyci5kYXRhLm1lc3NhZ2UgfHwgJ+ivt+axguWksei0pScsXHJcbiAgICAgICAgaWNvbjogXCJub25lXCIsXHJcbiAgICAgICAgZHVyYXRpb246IDIwMDBcclxuICAgICAgfSlcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIDQwMTpcclxuICAgICAgd3guaGlkZVRvYXN0KCk7XHJcbiAgICAgIHd4LnJlZGlyZWN0VG8oeyB1cmw6ICcvcGFnZXMvbG9naW4vbG9naW4nIH0pXHJcbiAgICAgIGJyZWFrO1xyXG4gICAgZGVmYXVsdDpcclxuICAgICAgd3guc2hvd1RvYXN0KHtcclxuICAgICAgICB0aXRsZTogJ+ivt+axguWksei0pScsXHJcbiAgICAgICAgaWNvbjogXCJub25lXCIsXHJcbiAgICAgICAgZHVyYXRpb246IDIwMDBcclxuICAgICAgfSlcclxuICAgICAgd3guaGlkZVRvYXN0KCk7XHJcbiAgICAgIGJyZWFrO1xyXG4gIH1cclxufTtcclxuY29uc3Qgc3VjY2Vzc0hhbmRsZSA9IChyZXM6IGFueSkgPT4ge1xyXG4gIHN3aXRjaCAocmVzLmRhdGEuY29kZSkge1xyXG4gICAgY2FzZSAyMDA6XHJcbiAgICAgIHd4LmhpZGVUb2FzdCgpO1xyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgNDAwOlxyXG4gICAgICB3eC5oaWRlVG9hc3QoKTtcclxuICAgICAgd3guc2hvd1RvYXN0KHtcclxuICAgICAgICB0aXRsZTogcmVzLmRhdGEubWVzc2FnZSB8fCAn6K+35rGC5oiQ5YqfJyxcclxuICAgICAgICBpY29uOiBcIm5vbmVcIixcclxuICAgICAgICBkdXJhdGlvbjogMjAwMFxyXG4gICAgICB9KVxyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgNDAxOlxyXG4gICAgICB3eC5oaWRlVG9hc3QoKTtcclxuICAgICAgd3gucmVkaXJlY3RUbyh7IHVybDogJy9wYWdlcy9sb2dpbi9sb2dpbicgfSlcclxuICAgICAgYnJlYWs7XHJcbiAgICBkZWZhdWx0OlxyXG4gICAgICB3eC5oaWRlVG9hc3QoKTtcclxuICAgICAgYnJlYWs7XHJcbiAgfVxyXG59XHJcbmludGVyZmFjZSBwYXRyb2xEYXRhIHtcclxuICB0eXBlOiBtYWluVHlwZSxcclxuICBjb21taXR0ZWU/OiBbYW55XSxcclxuICB1bml0PzogW2FueV0sXHJcbiAgY29tbXVuaXR5PzogW2FueV0sXHJcbiAgdmlsbGFnZT86IFthbnldLFxyXG4gIHBlbmFsdGllczogYW55LFxyXG4gIHNfdW5pdD86IGFueSxcclxuICBzX2NvbW1pdHRlZT86IGFueSxcclxuICBzX2NvbW11bml0eT86IGFueVxyXG4gIHNfdmlsbGFnZT86IGFueVxyXG59XHJcblxyXG5leHBvcnQgdHlwZSBtYWluVHlwZSA9IFwiY29tbXVuaXR5XCIgfCBcInN0cmVldFwiIHwgXCJ1bml0XCIgfCBcInZpbGxhZ2VcIiB8IE51bWJlcjtcclxuXHJcbmNsYXNzIEFQSSB7XHJcbiAgcHJpdmF0ZSBIT1NUID0gJ2h0dHBzOi8vdGVzdGFwaS4wMjF4enkuY29tLyc7IC8vIOa1i+ivleeOr+WigzJcclxuICAvLyBwcml2YXRlIEhPU1QgPSAnaHR0cHM6Ly90aWNrZXQtYXBpLmppYS1leHBvLmNvbSc7IC8vIOa1i+ivleeOr+Wig1xyXG4gIC8vIHByaXZhdGUgSE9TVCA9ICdodHRwczovL2FwaS4wMjF4enkuY29tLycgLy8g5q2j5byP546v5aKDXHJcblxyXG4gIHByaXZhdGUgaHR0cChVUkw6IHN0cmluZywgdHlwZTogXCJPUFRJT05TXCIgfCBcIkdFVFwiIHwgXCJIRUFEXCIgfCBcIlBPU1RcIiB8IFwiUFVUXCIgfCBcIkRFTEVURVwiIHwgXCJUUkFDRVwiIHwgXCJDT05ORUNUXCIgfCB1bmRlZmluZWQsIG9wdGlvbjogeyBkYXRhPzogYW55LCBoZWFkZXI/OiBhbnkgfSwgYXV0aG9yaXR5PzogJ2F1dGhvcml0eScpIHtcclxuICAgIGxldCB0b2tlbiA9IHd4LmdldFN0b3JhZ2VTeW5jKCd0b2tlbicpXHJcbiAgICBsZXQgX2RhdGE6IGFueSA9IG9wdGlvbi5kYXRhIHx8IHt9O1xyXG4gICAgbGV0IF9oZWFkZXI6IGFueSA9IG9wdGlvbi5kYXRhIHx8IHt9O1xyXG4gICAgaWYgKGF1dGhvcml0eSA9PT0gJ2F1dGhvcml0eScpIHtcclxuICAgICAgX2hlYWRlciA9IHsgVG9rZW46IHRva2VuLCAuLi5faGVhZGVyIH1cclxuICAgIH1cclxuICAgIHd4LnNob3dUb2FzdCh7XHJcbiAgICAgIHRpdGxlOiBcIuWKoOi9veS4rVwiLFxyXG4gICAgICBpY29uOiAnbG9hZGluZycsXHJcbiAgICAgIGR1cmF0aW9uOiA5OTk5XHJcbiAgICB9KVxyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgd3gucmVxdWVzdCh7XHJcbiAgICAgICAgdXJsOiB0aGlzLkhPU1QgKyBVUkwsXHJcbiAgICAgICAgbWV0aG9kOiB0eXBlLFxyXG4gICAgICAgIGRhdGE6IF9kYXRhLFxyXG4gICAgICAgIHRpbWVvdXQ6IDUwMDAsXHJcbiAgICAgICAgaGVhZGVyOiB7XHJcbiAgICAgICAgICAnY29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxyXG4gICAgICAgICAgJ0FjY2Vzcy1Db250cm9sLUFsbG93LUhlYWRlcnMnOiAnT3JpZ2luLCBYLVJlcXVlc3RlZC1XaXRoLCBDb250ZW50LVR5cGUsIEFjY2VwdCwgQXV0aG9yaXphdGlvbicsXHJcbiAgICAgICAgICAnQWNjZXNzLUNvbnRyb2wtQWxsb3ctTWV0aG9kJzogJ0dFVCwgUE9TVCwgT1BUSU9OUycsXHJcbiAgICAgICAgICAnQWNjZXNzLUNvbnRyb2wtQWxsb3ctT3JpZ2luJzogXCIqXCIsXHJcbiAgICAgICAgICAuLi5faGVhZGVyXHJcbiAgICAgICAgfSxcclxuICAgICAgICBjb21wbGV0ZShlOiBhbnkpIHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKCcxMTEnLCBlKTtcclxuICAgICAgICAgIGlmIChlLnN0YXR1c0NvZGUgPT09IDIwMCAmJiBlLmRhdGEuY29kZSA9PT0gMjAwKSB7XHJcbiAgICAgICAgICAgIHN1Y2Nlc3NIYW5kbGUoZSk7XHJcbiAgICAgICAgICAgIHJlc29sdmUoZSk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBmYWlsSGFuZGxlKGUpO1xyXG4gICAgICAgICAgICByZWplY3QoZSlcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICB9KVxyXG4gIH1cclxuICBwcml2YXRlIHR5cGVIYW5kbGUodHlwZT86IG1haW5UeXBlfHN0cmluZykge1xyXG4gICAgbGV0IHR5cGVOdW1iZXJcclxuICAgIHN3aXRjaCAodHlwZSkge1xyXG4gICAgICBjYXNlICdjb21tdW5pdHknOlxyXG4gICAgICAgIHR5cGVOdW1iZXIgPSA1XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgJ3ZpbGxhZ2UnOlxyXG4gICAgICAgIHR5cGVOdW1iZXIgPSA4XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgJ3VuaXQnOlxyXG4gICAgICAgIHR5cGVOdW1iZXIgPSA2XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgJ3N0cmVldCc6XHJcbiAgICAgICAgdHlwZU51bWJlciA9IDdcclxuICAgICAgICBicmVhaztcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICB0eXBlTnVtYmVyID0gMDtcclxuICAgICAgICBicmVhaztcclxuICAgIH1cclxuICAgIHJldHVybiB0eXBlTnVtYmVyXHJcbiAgfVxyXG4gIC8qKlxyXG4gICAqIGdldERhdGVcclxuICAgKi9cclxuICBwdWJsaWMgZ2V0RGF0ZSgpIHtcclxuICAgIHJldHVybiBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCkuc3BsaXQoJ1QnKVswXVxyXG4gIH1cclxuICBjb25zdHJ1Y3RvcigpIHsgfVxyXG4gIGNoZWNrVG9rZW4oKSB7XHJcbiAgICB0aGlzLmh0dHAoYC9iYWNrZW5kL2FwaS9jaGVja1Rva2VuYCwgJ0dFVCcsIHt9LCAnYXV0aG9yaXR5JylcclxuICB9XHJcbiAgbG9naW4odXNlcm5hbWU6IHN0cmluZywgcGFzc3dvcmQ6IHN0cmluZykge1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cCgnL2JhY2tlbmQvYXBpL2xvZ2luJywgXCJQT1NUXCIsIHsgZGF0YTogeyB1c2VyX25hbWU6IHVzZXJuYW1lLCBwd2Q6IHBhc3N3b3JkLCB0eXBlOiAxIH0gfSlcclxuICB9XHJcbiAgLyoqXHJcbiAqIGdldFVuaXRcclxuICog6I635Y+W5Y2V5L2NXHJcbiAqL1xyXG4gIHB1YmxpYyBnZXRVbml0KGNvbW1pdHRlZV9pZD86IG51bWJlciB8IHN0cmluZykge1xyXG4gICAgbGV0IGRhdGEgPSBjb21taXR0ZWVfaWQgPyB7IGNvbW1pdHRlZV9pZHM6IGNvbW1pdHRlZV9pZCArICcnIH0gOiB7fVxyXG4gICAgcmV0dXJuIHRoaXMuaHR0cChgL2JhY2tlbmQvYXBpL2NoZWNrQXJlYWAsIFwiR0VUXCIsIHsgZGF0YTogeyB0eXBlOiA2LCAuLi5kYXRhIH0gfSwgJ2F1dGhvcml0eScpXHJcbiAgfVxyXG4gIC8qKlxyXG4gICAqIGdldFN0cmVldFxyXG4gICAqIOiOt+WPluihl+mBk+W3oeafpeWIl+ihqFxyXG4gICAqL1xyXG4gIHB1YmxpYyBnZXRTdHJlZXQobmFtZT86IHN0cmluZykge1xyXG4gICAgbGV0IGRhdGEgPSBuYW1lID8geyBuYW1lIH0gOiB7fVxyXG4gICAgcmV0dXJuIHRoaXMuaHR0cChgL2JhY2tlbmQvYXBpL3N0cmVldFJvYWRMaXN0YCwgXCJHRVRcIiwgeyBkYXRhOiB7IC4uLmRhdGEgfSB9LCAnYXV0aG9yaXR5JylcclxuICB9XHJcbiAgLy8g6I635Y+W5bGF5aeUXHJcbiAgZ2V0Q29tbWl0dGUoY29tbWl0dGVlX2lkcz86IFtzdHJpbmcgfCBudW1iZXJdKSB7XHJcbiAgICBsZXQgaWRfc3RyaW5nID0gJydcclxuICAgIGxldCBkYXRhID0ge31cclxuICAgIGlmIChjb21taXR0ZWVfaWRzKSB7XHJcbiAgICAgIGNvbW1pdHRlZV9pZHMuZm9yRWFjaCgoZSwgaSkgPT4ge1xyXG4gICAgICAgIGlmIChpID09PSAwKSB7XHJcbiAgICAgICAgICBpZF9zdHJpbmcgPSBlICsgJydcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgaWRfc3RyaW5nID0gaWRfc3RyaW5nICsgJywnICsgZVxyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgIH1cclxuICAgIGlmIChpZF9zdHJpbmcpIHtcclxuICAgICAgZGF0YSA9IHsgY29tbWl0dGVlX2lkczogaWRfc3RyaW5nIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGhpcy5odHRwKGAvYmFja2VuZC9hcGkvY2hlY2tBcmVhYCwgXCJHRVRcIiwgeyBkYXRhOiB7IHR5cGU6IDQsIC4uLmRhdGEgfSB9LCAnYXV0aG9yaXR5JylcclxuICB9XHJcbiAgLyoqXHJcbiAgICog6I635Y+W5p2R5aeUXHJcbiAgICovXHJcbiAgZ2V0VmlsbGFnZUNvbW1pdHRlKGNvbW1pdHRlZV9pZHM/OiBbc3RyaW5nIHwgbnVtYmVyXSkge1xyXG4gICAgbGV0IGlkX3N0cmluZyA9ICcnXHJcbiAgICBsZXQgZGF0YSA9IHt9XHJcbiAgICBpZiAoY29tbWl0dGVlX2lkcykge1xyXG4gICAgICBjb21taXR0ZWVfaWRzLmZvckVhY2goKGUsIGkpID0+IHtcclxuICAgICAgICBpZiAoaSA9PT0gMCkge1xyXG4gICAgICAgICAgaWRfc3RyaW5nID0gZSArICcnXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGlkX3N0cmluZyA9IGlkX3N0cmluZyArICcsJyArIGVcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICB9XHJcbiAgICBpZiAoaWRfc3RyaW5nKSB7XHJcbiAgICAgIGRhdGEgPSB7IGNvbW1pdHRlZV9pZHM6IGlkX3N0cmluZyB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcy5odHRwKGAvYmFja2VuZC9hcGkvY2hlY2tBcmVhYCwgXCJHRVRcIiwgeyBkYXRhOiB7IHR5cGU6IDgsIC4uLmRhdGEgfSB9LCAnYXV0aG9yaXR5JylcclxuICB9XHJcbiAgZ2V0Q29tdW5pdHkoY29tbWl0dGVlX2lkczogW3N0cmluZ10sIHN1YmRpc3RyaWN0X2lkPzogbnVtYmVyIHwgc3RyaW5nKSB7XHJcbiAgICAvLyDojrflj5blsI/ljLpcclxuICAgIGxldCBpZF9zdHJpbmcgPSAnJ1xyXG4gICAgY29tbWl0dGVlX2lkcy5mb3JFYWNoKChlLCBpKSA9PiB7XHJcbiAgICAgIGlmIChpID09PSAwKSB7XHJcbiAgICAgICAgaWRfc3RyaW5nID0gZVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGlkX3N0cmluZyA9IGlkX3N0cmluZyArICcsJyArIGVcclxuICAgICAgfVxyXG4gICAgfSlcclxuICAgIGxldCBkYXRhID0ge31cclxuICAgIGRhdGEgPSBzdWJkaXN0cmljdF9pZCA/IHsgc3ViZGlzdHJpY3RfaWQ6IHN1YmRpc3RyaWN0X2lkICsgJycgfSA6IHt9XHJcbiAgICByZXR1cm4gdGhpcy5odHRwKGAvYmFja2VuZC9hcGkvY2hlY2tBcmVhYCwgXCJHRVRcIiwgeyBkYXRhOiB7IHR5cGU6IDUsIGNvbW1pdHRlZV9pZHM6IGlkX3N0cmluZywgLi4uZGF0YSB9IH0sICdhdXRob3JpdHknKVxyXG4gIH1cclxuICBnZXRWaWxsYWdlKGNvbW1pdHRlZV9pZHM6IFtzdHJpbmddLCBzdWJkaXN0cmljdF9pZD86IG51bWJlciB8IHN0cmluZykge1xyXG4gICAgLy8g6I635Y+W5bCP5Yy6XHJcbiAgICBsZXQgaWRfc3RyaW5nID0gJydcclxuICAgIGNvbW1pdHRlZV9pZHMuZm9yRWFjaCgoZSwgaSkgPT4ge1xyXG4gICAgICBpZiAoaSA9PT0gMCkge1xyXG4gICAgICAgIGlkX3N0cmluZyA9IGVcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBpZF9zdHJpbmcgPSBpZF9zdHJpbmcgKyAnLCcgKyBlXHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgICBsZXQgZGF0YSA9IHt9XHJcbiAgICBkYXRhID0gc3ViZGlzdHJpY3RfaWQgPyB7IHN1YmRpc3RyaWN0X2lkOiBzdWJkaXN0cmljdF9pZCArICcnIH0gOiB7fVxyXG4gICAgcmV0dXJuIHRoaXMuaHR0cChgL2JhY2tlbmQvYXBpL2NoZWNrQXJlYWAsIFwiR0VUXCIsIHsgZGF0YTogeyB0eXBlOiA1LCBjb21taXR0ZWVfaWRzOiBpZF9zdHJpbmcsIC4uLmRhdGEgfSB9LCAnYXV0aG9yaXR5JylcclxuICB9XHJcbiAgLy8g5pCc57Si5bCP5Yy6XHJcbiAgc2VhcmNoQ29tdW5pdHkobmFtZTogc3RyaW5nKSB7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwKGAvYmFja2VuZC9hcGkvY2hlY2tBcmVhYCwgXCJHRVRcIiwgeyBkYXRhOiB7IHR5cGU6IDUsIG5hbWU6IGVuY29kZVVSSShuYW1lKSB9IH0sICdhdXRob3JpdHknKVxyXG4gIH1cclxuXHJcbiAgLy8g5pCc57Si6KGM5pS/5p2RXHJcbiAgc2VhcmNoVmlsbGFnZShuYW1lOiBzdHJpbmcpIHtcclxuICAgIHJldHVybiB0aGlzLmh0dHAoYC9iYWNrZW5kL2FwaS9jaGVja0FyZWFgLCBcIkdFVFwiLCB7IGRhdGE6IHsgdHlwZTogNSwgbmFtZTogZW5jb2RlVVJJKG5hbWUpIH0gfSwgJ2F1dGhvcml0eScpXHJcbiAgfVxyXG4gIC8qKlxyXG4gICAqIHNlYXJjaFVuaXRcclxuICAgKiDmkJzntKLljZXkvY1cclxuICAgKi9cclxuICBwdWJsaWMgc2VhcmNoVW5pdChuYW1lOiBzdHJpbmcpIHtcclxuICAgIHJldHVybiB0aGlzLmh0dHAoYC9iYWNrZW5kL2FwaS9jaGVja0FyZWFgLCBcIkdFVFwiLCB7IGRhdGE6IHsgdHlwZTogNiwgbmFtZTogZW5jb2RlVVJJKG5hbWUpIH0gfSwgJ2F1dGhvcml0eScpXHJcbiAgfVxyXG4gIC8qKlxyXG4gICAqIGdldFBlbmFsdGllc1xyXG4gICAqIOiOt+WPluWwj+WMuuaJo+WIhumhuVxyXG4gICAqL1xyXG4gIHB1YmxpYyBnZXRDb211bml0eVBlbmFsdGllcyhzdWJkaXN0cmljdF9pZDogbnVtYmVyIHwgc3RyaW5nKSB7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwKCcvYmFja2VuZC9hcGkvZGVkdWN0UG9pbnRzQ29uZmlnJywgXCJHRVRcIiwgeyBkYXRhOiB7IHR5cGU6IDUsIHN1YmRpc3RyaWN0X2lkIH0gfSwgJ2F1dGhvcml0eScpXHJcbiAgfVxyXG4gIC8qKlxyXG4gKiBnZXRQZW5hbHRpZXNcclxuICog6I635Y+W6KGM5pS/5p2R5omj5YiG6aG5XHJcbiAqL1xyXG4gIHB1YmxpYyBnZXRWaWxsYWdlUGVuYWx0aWVzKHN1YmRpc3RyaWN0X2lkOiBudW1iZXIgfCBzdHJpbmcpIHtcclxuICAgIHJldHVybiB0aGlzLmh0dHAoJy9iYWNrZW5kL2FwaS9kZWR1Y3RQb2ludHNDb25maWcnLCBcIkdFVFwiLCB7IGRhdGE6IHsgdHlwZTogOCwgc3ViZGlzdHJpY3RfaWQgfSB9LCAnYXV0aG9yaXR5JylcclxuICB9XHJcbiAgLyoqXHJcbiAgICogZ2V0U3RyZWV0UGVuYWx0aWVzXHJcbiAgICog6I635Y+W5rK/6KGX6KGX6YGT5omj5YiG6aG5XHJcbiAgICovXHJcbiAgcHVibGljIGdldFN0cmVldFBlbmFsdGllcygpIHtcclxuICAgIHJldHVybiB0aGlzLmh0dHAoJy9iYWNrZW5kL2FwaS9kZWR1Y3RQb2ludHNDb25maWcnLCBcIkdFVFwiLCB7IGRhdGE6IHsgdHlwZTogNyB9IH0sICdhdXRob3JpdHknKVxyXG4gIH1cclxuICAvKipcclxuICAgKiBnZXRVbml0UGVuYWx0aWVzXHJcbiAgICog6I635Y+W5Y2V5L2N6YGT5omj5YiG6aG5XHJcbiAgICovXHJcbiAgcHVibGljIGdldFVuaXRQZW5hbHRpZXMoY29tbWl0dGVlX2lkOiBudW1iZXIgfCBzdHJpbmcpIHtcclxuICAgIHJldHVybiB0aGlzLmh0dHAoJy9iYWNrZW5kL2FwaS9kZWR1Y3RQb2ludHNDb25maWcnLCBcIkdFVFwiLCB7IGRhdGE6IHsgdHlwZTogNiwgY29tbWl0dGVlX2lkIH0gfSwgJ2F1dGhvcml0eScpXHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBzYXZlQ3VycmVudFBlbmFsdGllc1xyXG4gICAqIOS/neWtmOW9k+WJjeato+WcqOW3oeafpeeahOmhtemdoue8k+WtmFxyXG4gICAqL1xyXG4gIHB1YmxpYyBzYXZlQ3VycmVudFBlbmFsdGllcyhwYXRyb2xEYXRhOiBwYXRyb2xEYXRhKSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcclxuICAgICAgd3guc2V0U3RvcmFnZVN5bmMoJ3BhdHJvbERhdGFfJyArIHBhdHJvbERhdGEudHlwZSwgcGF0cm9sRGF0YSk7XHJcbiAgICAgIHJlc29sdmUodHJ1ZSlcclxuICAgIH0pXHJcbiAgfVxyXG4gIC8qKlxyXG4gICAqIGdldEN1cnJlbnRQZW5hbHRpZXNcclxuICAgKiDojrflj5blvZPliY3mraPlnKjlt6Hmn6XnmoTpobXpnaLnvJPlrZhcclxuICAgKi9cclxuICBwdWJsaWMgZ2V0Q3VycmVudFBlbmFsdGllcyh0eXBlOiBzdHJpbmcpIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xyXG4gICAgICByZXNvbHZlKHd4LmdldFN0b3JhZ2VTeW5jKCdwYXRyb2xEYXRhXycgKyB0eXBlKSlcclxuICAgIH0pXHJcbiAgfVxyXG4gIC8qKlxyXG4gICAqIHVwRGVjdXRDb211bml0eVxyXG4gICAqIOS4iuS8oOekvuWMuuaJk+WIhlxyXG4gICAqL1xyXG4gIHB1YmxpYyB1cERlY3V0Q29tdW5pdHkoZGF0YTogYW55KSB7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwKCcvYmFja2VuZC9hcGkvZGVkdWN0UG9pbnRzQWN0aW9uJywgXCJQT1NUXCIsIHsgZGF0YTogeyAuLi5kYXRhLCB0eXBlOiA1IH0gfSwgJ2F1dGhvcml0eScpXHJcbiAgfVxyXG4gIC8qKlxyXG4gKiB1cERlY3V0Q29tdW5pdHlcclxuICog5LiK5Lyg56S+5Yy65omT5YiGXHJcbiAqL1xyXG4gIHB1YmxpYyB1cERlY3V0VmlsbGFnZShkYXRhOiBhbnkpIHtcclxuICAgIHJldHVybiB0aGlzLmh0dHAoJy9iYWNrZW5kL2FwaS9kZWR1Y3RQb2ludHNBY3Rpb24nLCBcIlBPU1RcIiwgeyBkYXRhOiB7IC4uLmRhdGEsIHR5cGU6IDggfSB9LCAnYXV0aG9yaXR5JylcclxuICB9XHJcbiAgLyoqXHJcbiAgICogdXBEZWN1dFVuaXRcclxuICAgKiDkuIrkvKDljZXkvY3miZPliIZcclxuICAgKi9cclxuICBwdWJsaWMgdXBEZWN1dFVuaXQoZGF0YTogYW55KSB7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwKCcvYmFja2VuZC9hcGkvZGVkdWN0UG9pbnRzQWN0aW9uJywgXCJQT1NUXCIsIHsgZGF0YTogeyAuLi5kYXRhLCB0eXBlOiA2IH0gfSwgJ2F1dGhvcml0eScpXHJcbiAgfVxyXG4gIC8qKlxyXG4gICAqIHVwbG9hZEZpbGVcclxuICAgKiDlvq7kv6HkuIrkvKDlm77niYdcclxuICAgKi9cclxuICBwdWJsaWMgdXBsb2FkRmlsZSh0ZW1wVXJsOiBzdHJpbmcpIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgIGlmICh0ZW1wVXJsLmluZGV4T2YoJ2h0dHBzOi8vaW1nLmh4amJjZG4uY29tJykgPiAtMSkge1xyXG4gICAgICAgIC8vIEpTT04ucGFyc2UocmVzLmRhdGEpLnJlc3VsdExpc3RbMF0uYWNjZXNzX3VybFxyXG4gICAgICAgIGxldCBkYXRhID0ge1xyXG4gICAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkoeyByZXN1bHRMaXN0OiBbeyBhY2Nlc3NfdXJsOiB0ZW1wVXJsIH1dIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJlc29sdmUoZGF0YSlcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgICAgd3gudXBsb2FkRmlsZSh7XHJcbiAgICAgICAgLy8gdXJsOiAnaHR0cHM6Ly9hcGkuNTFqaWFiby5jb20vZmlsZS92Mi4wL3VwbG9hZEltYWdlJywgLy/ku4XkuLrnpLrkvovvvIzpnZ7nnJ/lrp7nmoTmjqXlj6PlnLDlnYBcclxuICAgICAgICB1cmw6ICdodHRwczovL2ZpbGUuMDIxeHp5LmNvbS9maWxlL3YyLjAvdXBsb2FkSW1hZ2UnLCAvL+S7heS4uuekuuS+i++8jOmdnuecn+WunueahOaOpeWPo+WcsOWdgFxyXG4gICAgICAgIGZpbGVQYXRoOiB0ZW1wVXJsLFxyXG4gICAgICAgIG5hbWU6ICdmaWxlJyxcclxuICAgICAgICB0aW1lb3V0OiA1MDAwLFxyXG4gICAgICAgIGhlYWRlcjoge1xyXG4gICAgICAgICAgJ1Rva2VuJzogd3guZ2V0U3RvcmFnZVN5bmMoJ3Rva2VuJyksXHJcbiAgICAgICAgICAnY29udGVudC10eXBlJzogJ211bHRpcGFydC9mb3JtLWRhdGEnLFxyXG4gICAgICAgICAgJ0FjY2Vzcy1Db250cm9sLUFsbG93LUhlYWRlcnMnOiAnT3JpZ2luLCBYLVJlcXVlc3RlZC1XaXRoLCBDb250ZW50LVR5cGUsIEFjY2VwdCwgQXV0aG9yaXphdGlvbicsXHJcbiAgICAgICAgICAnQWNjZXNzLUNvbnRyb2wtQWxsb3ctTWV0aG9kJzogJ0dFVCwgUE9TVCwgT1BUSU9OUycsXHJcbiAgICAgICAgICAnQWNjZXNzLUNvbnRyb2wtQWxsb3ctT3JpZ2luJzogXCIqXCIsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBzdWNjZXNzKHJlcykge1xyXG4gICAgICAgICAgc3VjY2Vzc0hhbmRsZShyZXMpO1xyXG4gICAgICAgICAgcmVzb2x2ZShyZXMpXHJcbiAgICAgICAgfSxcclxuICAgICAgICBmYWlsKGUpIHtcclxuICAgICAgICAgIHd4LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICAgIHRpdGxlOiBcIuS4iuS8oOWbvueJh+Wksei0pVwiLFxyXG4gICAgICAgICAgICBpY29uOiAnbm9uZScsXHJcbiAgICAgICAgICAgIGR1cmF0aW9uOiAyMDAwXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIHJlamVjdChlKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICB9KVxyXG4gIH1cclxuXHJcbiAgcHVibGljIHVwbG9hZEltZ3MoaW1hZ2VzOiBBcnJheTxhbnk+KSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICBsZXQgaW5kZXggPSAwXHJcbiAgICAgIGxldCBsYXN0ID0gaW1hZ2VzLmxlbmd0aCAtIDFcclxuICAgICAgbGV0IHBpY2FyciA9IDxhbnk+W11cclxuICAgICAgd3guc2hvd0xvYWRpbmcoeyB0aXRsZTogJ+S4iuS8oOS4rScgfSlcclxuICAgICAgbGV0IHVwID0gKCkgPT4ge1xyXG4gICAgICAgIGlmIChpbmRleCA8PSBsYXN0KSB7XHJcbiAgICAgICAgICB0aGlzLnVwbG9hZEZpbGUoaW1hZ2VzW2luZGV4XS51cmwgfHwgaW1hZ2VzW2luZGV4XSkudGhlbigocmVzOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgcGljYXJyLnB1c2goSlNPTi5wYXJzZShyZXMuZGF0YSkucmVzdWx0TGlzdFswXS5hY2Nlc3NfdXJsKVxyXG4gICAgICAgICAgICBpbmRleCA9IGluZGV4ICsgMVxyXG4gICAgICAgICAgICB1cCgpO1xyXG4gICAgICAgICAgfSwgKGVycjogYW55KSA9PiB7XHJcbiAgICAgICAgICAgIHd4LmhpZGVMb2FkaW5nKClcclxuICAgICAgICAgICAgcmVqZWN0KGVycilcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHd4LmhpZGVMb2FkaW5nKClcclxuICAgICAgICAgIHJlc29sdmUocGljYXJyKVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICB1cCgpO1xyXG4gICAgfSlcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIGdldFJlY29yZFxyXG4gICAqIOiOt+WPluW9k+aXpeW3oeafpeiusOW9lVxyXG4gICAqL1xyXG4gIHB1YmxpYyBnZXRSZWNvcmQodHlwZTogbWFpblR5cGUpIHtcclxuICAgIGxldCB0eXBlMjogTnVtYmVyIHwgU3RyaW5nID0gMFxyXG4gICAgdHlwZTIgPSB0aGlzLnR5cGVIYW5kbGUodHlwZSlcclxuICAgIHJldHVybiB0aGlzLmh0dHAoYC9iYWNrZW5kL2FwaS9Vc2VyUGF0cm9sTGlzdGAsICdHRVQnLCB7IGRhdGE6IHsgdHlwZTogdHlwZTIgfSB9LCBcImF1dGhvcml0eVwiKVxyXG4gIH1cclxuICAvKipcclxuICAgKiBzZXRQYXRyb2xUeXBlXHJcbiAgICog6K6+572u6L+b5YWl5beh5p+l6aG16Z2i55qE57Sv5b+DXHJcbiAgICovXHJcbiAgcHVibGljIHNldFBhdHJvbFR5cGUodHlwZTogJ25ldycgfCAncmVjb3JkJykge1xyXG4gICAgd3guc2V0U3RvcmFnZVN5bmMoJ3BhdHJvbFR5cGUnLCB0eXBlKVxyXG4gIH1cclxuICAvKipcclxuICAgKiBzZXRSZWNvcmREYXRhXHJcbiAgICog6K6+572u5p+l55yL5beh5p+l6K6w5b2V5pe255qE5Lyg6YCS5pWw5o2uXHJcbiAgICovXHJcbiAgcHVibGljIHNldFJlY29yZERhdGEoZGF0YTogeyB0eXBlOiBtYWluVHlwZSwgY29tbWl0dGVlX2lkPzogbnVtYmVyLCBzdWJkaXN0cmljdF9pZD86IG51bWJlciB9KSB7XHJcbiAgICB3eC5zZXRTdG9yYWdlU3luYygncmVjb3JkRGF0YScsIGRhdGEpXHJcbiAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAqIOiOt+WPluekvuWMuueuoeeQhuWIl+ihqFxyXG4gICAqL1xyXG4gIHB1YmxpYyBnZXRDb21tdW5pdHlMaXN0KHVwRGF0YToge1xyXG4gICAgdHlwZTogbWFpblR5cGUgfCBudW1iZXIsXHJcbiAgICBwYWdlOiBudW1iZXIgfCBzdHJpbmcsXHJcbiAgICBwYWdlU2l6ZT86IG51bWJlclxyXG4gIH0pIHtcclxuICAgIGxldCB0eXBlTnVtYmVyOiBudW1iZXIgfCBzdHJpbmcgPSAwXHJcbiAgICB0eXBlTnVtYmVyID0gdGhpcy50eXBlSGFuZGxlKHVwRGF0YS50eXBlKVxyXG4gICAgdXBEYXRhLnR5cGUgPSB0eXBlTnVtYmVyXHJcbiAgICB1cERhdGEucGFnZSA9IHVwRGF0YS5wYWdlIHx8IDFcclxuICAgIHVwRGF0YS5wYWdlU2l6ZSA9IHVwRGF0YS5wYWdlU2l6ZSB8fCAxMFxyXG4gICAgcmV0dXJuIHRoaXMuaHR0cCgnL2luZm9ybWF0aW9uL2FwaS9hcmVhTGlzdCcsIFwiR0VUXCIsIHsgZGF0YTogdXBEYXRhIH0sICdhdXRob3JpdHknKVxyXG4gIH1cclxuICAvKipcclxuICAgKiDojrflj5bnpL7ljLrnrqHnkIbor6bmg4VcclxuICAgKi9cclxuICBwdWJsaWMgZ2V0Q29tbXVuaXR5RGV0YWlsKHVwRGF0YToge1xyXG4gICAgc3ViZGlzdHJpY3RfaWQ/OiBudW1iZXIgfCBzdHJpbmcsXHJcbiAgfSkge1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cCgnL2JhY2tlbmQveGN4L1N1YkRpc3RyaWN0RGV0YWlsJywgXCJHRVRcIiwgeyBkYXRhOiB1cERhdGEgfSwgJ2F1dGhvcml0eScpXHJcbiAgfVxyXG4gIHB1YmxpYyBnZXRDb21tdW5pdHlEZXRhaWwyKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cCgnL2JhY2tlbmQveGN4L1N1YkRpc3RyaWN0RGV0YWlsJywgXCJHRVRcIiwgeyB9LCAnYXV0aG9yaXR5JylcclxuICB9XHJcbiAgLy8g5Z2Q5qCH5L+h5oGvXHJcbiAgcHVibGljIGdldENvb3JkaW5hdGVNc2coYWRkcmVzczogc3RyaW5nKSB7XHJcbiAgICBjb25zb2xlLmxvZygnMTIzJywgYWRkcmVzcylcclxuICAgIC8vIOWwj+eoi+W6j+aOpeWPguS4uuaxieWtl+aYr+mcgOimgei9rOegge+8jOS4i+mdoui/meenjeWGmeazlVxyXG4gICAgLy8gcmV0dXJuIHRoaXMuaHR0cCgnL3hjeC9hcGkvbG9hY3Rpb24nLCBcIlBPU1RcIiwgeyBkYXRhOiB1cERhdGEgfSwgJ2F1dGhvcml0eScpXHJcbiAgICByZXR1cm4gdGhpcy5odHRwKCcveGN4L2FwaS9sb2FjdGlvbicsIFwiR0VUXCIsIHsgZGF0YTogeyBhZGRyZXNzOiBlbmNvZGVVUkkoYWRkcmVzcykgfSB9LCAnYXV0aG9yaXR5JylcclxuICB9XHJcbiAgLyoqXHJcbiAgICog5oiR55qELeekvuWMuuivpuaDhTIwMjEvOC8xOVxyXG4gICAqL1xyXG4gIC8vIOWfuuehgFxyXG4gIHB1YmxpYyBqY0VkaXQoZGF0YToge1xyXG4gICAgc3ViZGlzdHJpY3RfaWQ/OiBudW1iZXIgfCBzdHJpbmcsXHJcbiAgICB0aHVtYl9pbWc6ICcnLFxyXG4gICAgaG91c2Vob2xkX251bTogJycsXHJcbiAgICBidWlsZGluZ19udW06ICcnLFxyXG4gICAgdm9sdW50ZWVyX3RvdGFsOiAnJyxcclxuICAgIGNsZWFuZXJfdG90YWw6ICcnLFxyXG4gICAgaG91c2VfdHlwZTogJ+mAieaLqeaIv+Wxi+exu+WeiycsXHJcbiAgICBidWlsZGluZ190aW1lOiAn6YCJ5oup5pel5pyfJyxcclxuICAgIGFkZHJlc3M6ICcnXHJcbiAgfSkge1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cChgL2JhY2tlbmQvYXBpL3N1Yl9kaXN0cmljdC91cGRhdGVgLCAnUE9TVCcsIHsgZGF0YTogZGF0YSB9LCAnYXV0aG9yaXR5JylcclxuICB9XHJcbiAgcHVibGljIGJ5RWRpdChkYXRhOiB7XHJcbiAgICBzdWJkaXN0cmljdF9pZD86IG51bWJlciB8IHN0cmluZyxcclxuICAgIGltZ191cmw6ICcnLFxyXG4gICAgYnJhbmQ6ICcnLFxyXG4gICAgdXNlX3R5cGU6ICcnLFxyXG4gICAgcGxhdGVfbnVtYmVyOiAnJyxcclxuICAgIG1vZGVsOiAnJ1xyXG4gIH0pIHtcclxuICAgIHJldHVybiB0aGlzLmh0dHAoYC9iYWNrZW5kL2FwaS9hZGRDYXJgLCAnUE9TVCcsIHsgZGF0YTogZGF0YSB9LCAnYXV0aG9yaXR5JylcclxuICB9XHJcbiAgcHVibGljIGxqeGZFZGl0KGRhdGE6IHtcclxuICAgIHN1YmRpc3RyaWN0X2lkPzogbnVtYmVyIHwgc3RyaW5nLFxyXG4gICAgaW1hZ2VfdXJsOiAnJyxcclxuICAgIHdpbmdfcm9vbV9uYW1lOiAnJyxcclxuICAgIG1hcms6ICcnLFxyXG4gICAgYWRkcmVzczogJycsXHJcbiAgICB3aW5nX3R5cGU6ICcnLFxyXG4gICAgaW5mb0xpc3Q6IFtdLFxyXG4gICAgY2xhc3NMaXN0OiBbXVxyXG4gIH0pIHtcclxuICAgIHJldHVybiB0aGlzLmh0dHAoYC9iYWNrZW5kL2FwaS9hZGRXaW5nUm9vbWAsICdQT1NUJywgeyBkYXRhOiBkYXRhIH0sICdhdXRob3JpdHknKVxyXG4gIH1cclxuICAvLyDliKDpmaTpqbPov5BcclxuICBwdWJsaWMgZGVsZXRlQnkoZGF0YToge1xyXG4gICAgc3ViZGlzdHJpY3RfaWQ/OiBudW1iZXIgfCBzdHJpbmcsXHJcbiAgICBjYXJfaWQ/OiBudW1iZXIgfCBzdHJpbmcsXHJcbiAgICBkZWxfZmxhZz86IG51bWJlciB8IHN0cmluZ1xyXG4gIH0pIHtcclxuICAgIHJldHVybiB0aGlzLmh0dHAoYC9iYWNrZW5kL2FwaS9hZGRDYXJgLCAnUE9TVCcsIHsgZGF0YTogZGF0YSB9LCAnYXV0aG9yaXR5JylcclxuICB9XHJcbiAgLy8g5Yig6Zmk5Z6D5Zy+566x5oi/XHJcbiAgcHVibGljIGRlbGV0ZUxqeGYoZGF0YToge1xyXG4gICAgLy8gc3ViZGlzdHJpY3RfaWQ/OiBudW1iZXIgfCBzdHJpbmcsXHJcbiAgICB3aW5nX3Jvb21faWQ/OiBudW1iZXIgfCBzdHJpbmcsXHJcbiAgICBkZWxfZmxhZz86IG51bWJlciB8IHN0cmluZ1xyXG4gIH0pIHtcclxuICAgIHJldHVybiB0aGlzLmh0dHAoYC9iYWNrZW5kL2FwaS93aW5nUm9vbVVwZGF0ZWAsICdQT1NUJywgeyBkYXRhOiBkYXRhIH0sICdhdXRob3JpdHknKVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog6I635Y+W5beh5p+l5oql5ZGK5pWw5o2uXHJcbiAgICovXHJcbiAgcHVibGljIGdldFJlcG9ydERhdGEodXBEYXRhOiB7XHJcbiAgICB0eXBlOiBtYWluVHlwZSB8IG51bWJlcixcclxuICAgIHBhZ2U6IG51bWJlciB8IHN0cmluZyxcclxuICAgIHBhZ2VTaXplPzogbnVtYmVyXHJcbiAgfSkge1xyXG4gICAgbGV0IHR5cGVOdW1iZXI6IG51bWJlciB8IHN0cmluZyA9IDBcclxuICAgIHR5cGVOdW1iZXIgPSB0aGlzLnR5cGVIYW5kbGUodXBEYXRhLnR5cGUpXHJcbiAgICB1cERhdGEudHlwZSA9IHR5cGVOdW1iZXJcclxuICAgIHVwRGF0YS5wYWdlID0gdXBEYXRhLnBhZ2UgfHwgMVxyXG4gICAgdXBEYXRhLnBhZ2VTaXplID0gdXBEYXRhLnBhZ2VTaXplIHx8IDI1XHJcbiAgICByZXR1cm4gdGhpcy5odHRwKCcvYmFja2VuZC9hcGkvcGF0cm9sTGlzdCcsIFwiR0VUXCIsIHsgZGF0YTogdXBEYXRhIH0sICdhdXRob3JpdHknKVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog6I635Y+W5YiG57G75pe25pWI5pWw5o2uXHJcbiAgICovXHJcbiAgcHVibGljIGdldENsYXNzaWZpY2F0aW9uRGF0YSgpIHtcclxuICAgIHJldHVybiB0aGlzLmh0dHAoJy9iYWNrZW5kL2FwaS9jbGFzc2lmaWNhdGlvbicsIFwiR0VUXCIsIHt9LCAnYXV0aG9yaXR5JylcclxuICB9XHJcblxyXG4gIC8vIOajgOafpeaYr+WQpue7keWumuaJi+acuuWPt1xyXG4gIHB1YmxpYyBnZXRQaG9uZU51bWJlcigpIHtcclxuICAgIHJldHVybiB0aGlzLmh0dHAoJy9iYWNrZW5kL2FwaS9jaGVja1VzZXJNb2JpbGUnLCBcIkdFVFwiLCB7fSwgJ2F1dGhvcml0eScpXHJcbiAgfVxyXG4gIC8vIOe7keWumuW+ruS/oeaJi+acuuWPt1xyXG4gIHB1YmxpYyBiaW5kUGhvbmUodXBEYXRhOiB7XHJcbiAgICB3eGNvZGU6IHN0cmluZyxcclxuICAgIGVuY3J5cHRlZERhdGE6IHN0cmluZyxcclxuICAgIG9mZnNldDogc3RyaW5nXHJcbiAgICB9KSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmh0dHAoJy9iYWNrZW5kL2FwaS9iaW5kTW9iaWxlJywgXCJQT1NUXCIsIHtkYXRhOiB1cERhdGF9LCAnYXV0aG9yaXR5JylcclxuICAgIH1cclxuICAvLyDovpPlhaXmiYvmnLrlj7fnu5HlrppcclxuICBwdWJsaWMgaXB0UGhvbmUodXBEYXRhOiB7XHJcbiAgICBtb2JpbGU6IHN0cmluZyxcclxuICAgIH0pIHtcclxuICAgICAgcmV0dXJuIHRoaXMuaHR0cCgnL2JhY2tlbmQvYXBpL2JpbmRNb2JpbGVOZXcnLCBcIlBPU1RcIiwge2RhdGE6IHVwRGF0YX0sICdhdXRob3JpdHknKVxyXG4gIH1cclxuICAvLyDlj7DotKbloavmiqVcclxuICBwdWJsaWMgbmV3QWNjb3VudChkYXRhOiB7XHJcbiAgICB3YXN0ZV9kcnk6IHN0cmluZyxcclxuICAgIHdhc3RlX3dldDogc3RyaW5nLFxyXG4gICAgd2FzdGVfcmVjeWNsYWJsOiBzdHJpbmcsXHJcbiAgICB3YXN0ZV9hcmNoaXRlY3R1cmU6IHN0cmluZyxcclxuICAgIHdhc3RlX2hhcm1mdWw6IHN0cmluZyxcclxuICAgIGRlcGFydHVyZV90aW1lOiBzdHJpbmcsXHJcbiAgfSkge1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cChgL2JhY2tlbmQvYXBpL3NlbGZTYXZlUmVjb3JkYCwgJ1BPU1QnLCB7IGRhdGE6IGRhdGEgfSwgJ2F1dGhvcml0eScpXHJcbiAgfVxyXG4gIHB1YmxpYyBuZXdBY2NvdW50MihkYXRhOiB7XHJcbiAgICB3YXN0ZV9nbGFzczogbnVtYmVyIHwgc3RyaW5nLFxyXG4gICAgd2FzdGVfcGxhc3RpYzogbnVtYmVyIHwgc3RyaW5nLFxyXG4gICAgd2FzdGVfd29vZDogbnVtYmVyIHwgc3RyaW5nLFxyXG4gICAgd2FzdGVfcGFwZXI6IG51bWJlciB8IHN0cmluZyxcclxuICAgIHdhc3RlX2VsZWN0cm9uaWM6IG51bWJlciB8IHN0cmluZyxcclxuICAgIHdhc3RlX2Nsb3RoZXM6IG51bWJlciB8IHN0cmluZyxcclxuICAgIHdhc3RlX21ldGFsOiBudW1iZXIgfCBzdHJpbmcsXHJcbiAgICB3YXN0ZV9vdGhlcjogbnVtYmVyIHwgc3RyaW5nLFxyXG4gICAgZGVwYXJ0dXJlX3RpbWU6IHN0cmluZyxcclxuICB9KSB7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwKGAvYmFja2VuZC9hcGkvc2VsZlNhdmVSZWNvcmRgLCAnUE9TVCcsIHsgZGF0YTogZGF0YSB9LCAnYXV0aG9yaXR5JylcclxuICB9XHJcbiAgcHVibGljIG5ld0FjY291bnQzKGRhdGE6IHtcclxuICAgIHdhc3RlX2RyeTogc3RyaW5nLFxyXG4gICAgd2FzdGVfd2V0OiBzdHJpbmcsXHJcbiAgICB3YXN0ZV9yZWN5Y2xhYmw6IHN0cmluZyxcclxuICAgIHdhc3RlX2FyY2hpdGVjdHVyZTogc3RyaW5nLFxyXG4gICAgd2FzdGVfaGFybWZ1bDogc3RyaW5nLFxyXG4gICAgZGVwYXJ0dXJlX3RpbWU6IHN0cmluZyxcclxuICAgIHdhc3RlX2dsYXNzOiBudW1iZXIgfCBzdHJpbmcsXHJcbiAgICB3YXN0ZV9wbGFzdGljOiBudW1iZXIgfCBzdHJpbmcsXHJcbiAgICB3YXN0ZV93b29kOiBudW1iZXIgfCBzdHJpbmcsXHJcbiAgICB3YXN0ZV9wYXBlcjogbnVtYmVyIHwgc3RyaW5nLFxyXG4gICAgd2FzdGVfZWxlY3Ryb25pYzogbnVtYmVyIHwgc3RyaW5nLFxyXG4gICAgd2FzdGVfY2xvdGhlczogbnVtYmVyIHwgc3RyaW5nLFxyXG4gICAgd2FzdGVfbWV0YWw6IG51bWJlciB8IHN0cmluZyxcclxuICAgIHdhc3RlX290aGVyOiBudW1iZXIgfCBzdHJpbmcsXHJcbiAgfSkge1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cChgL2JhY2tlbmQvYXBpL3NlbGZTYXZlUmVjb3JkYCwgJ1BPU1QnLCB7IGRhdGE6IGRhdGEgfSwgJ2F1dGhvcml0eScpXHJcbiAgfVxyXG5cclxuICAvLyDlkI7lj7BcclxuICAvKipcclxuICAgKiBnZXRBbmFseXNpc0RhdGFcclxuICAgKiDojrflj5bmlbTmlLnmlbDph49cclxuICAgKiDlkI7lj7DpppbpobVcclxuICAgKi9cclxuICBwdWJsaWMgZ2V0QW5hbHlzaXNEYXRhKHR5cGU/OiBtYWluVHlwZSkge1xyXG4gICAgbGV0IHR5cGVOdW1iZXI6IG51bWJlciB8IHN0cmluZyA9IDBcclxuICAgIHR5cGVOdW1iZXIgPSB0aGlzLnR5cGVIYW5kbGUodHlwZSlcclxuICAgIHJldHVybiB0aGlzLmh0dHAoJy9iYWNrZW5kL2FwaS9hbmFseXNpc0RhdGEnLCBcIkdFVFwiLCB7IGRhdGE6IHsgdHlwZTogdHlwZU51bWJlciB9IH0sICdhdXRob3JpdHknKVxyXG4gIH1cclxuICBwdWJsaWMgc2V0RmVlZGJhY2tUeXBlKHR5cGU6IG1haW5UeXBlKSB7XHJcbiAgICB3eC5zZXRTdG9yYWdlU3luYygnZmVlZGJhY2tUeXBlJywgdHlwZSlcclxuICB9XHJcbiAgcHVibGljIGdldFBvaW50cyh0eXBlPzogbWFpblR5cGUpIHtcclxuICAgIGxldCB0eXBlTnVtYmVyOiBudW1iZXIgfCBzdHJpbmcgPSAwXHJcbiAgICB0eXBlTnVtYmVyID0gdGhpcy50eXBlSGFuZGxlKHR5cGUpXHJcbiAgICByZXR1cm4gdGhpcy5odHRwKCcvYmFja2VuZC94Y3gvcmF0ZURhdGEnLCBcIkdFVFwiLCB7IGRhdGE6IHsgdHlwZTogdHlwZU51bWJlciB9IH0sICdhdXRob3JpdHknKVxyXG4gIH1cclxuICAvKipcclxuICAgKiBnZXRGZWVkYmFja0xpc3RcclxuICAgKiDojrflj5bmlbTmlLnlj43ppojliJfooahcclxuICAgKi9cclxuICBwdWJsaWMgZ2V0RmVlZGJhY2tMaXN0KHVwRGF0YToge1xyXG4gICAgdHlwZTogbWFpblR5cGUgfCBudW1iZXIsXHJcbiAgICBzdGF0dXM6ICdhbGwnIHwgJ3BlbmRpbmcnIHwgJ25vdHlldCcgfCAnZG9uZScgfCBudW1iZXIgfCBzdHJpbmcsXHJcbiAgICBwYWdlOiBudW1iZXIgfCBzdHJpbmcsXHJcbiAgICBuYW1lPzogc3RyaW5nLFxyXG4gICAgYmVnaW5fY3JlYXRlX2RhdGU/OiBzdHJpbmcsXHJcbiAgICBlbmRfY3JlYXRlX2RhdGU/OiBzdHJpbmcsXHJcbiAgICBwYWdlU2l6ZT86IG51bWJlcixcclxuICAgIGRlZnVjdF9pZD86IG51bWJlciB8IHN0cmluZyxcclxuICAgIGNhdGVnb3J5X2lkPzogbnVtYmVyIHwgc3RyaW5nXHJcbiAgfSkge1xyXG4gICAgbGV0IHR5cGVOdW1iZXIgPSAwXHJcbiAgICBsZXQgc3RhdHVzQ29kZTogbnVtYmVyIHwgc3RyaW5nID0gMFxyXG4gICAgdHlwZU51bWJlciA9IHRoaXMudHlwZUhhbmRsZSh1cERhdGEudHlwZSlcclxuICAgIHN3aXRjaCAodXBEYXRhLnN0YXR1cykge1xyXG4gICAgICBjYXNlICdhbGwnOlxyXG4gICAgICAgIHN0YXR1c0NvZGUgPSAnJ1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICdwZW5kaW5nJzpcclxuICAgICAgICBzdGF0dXNDb2RlID0gMlxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICdub3R5ZXQnOlxyXG4gICAgICAgIHN0YXR1c0NvZGUgPSAtMVxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICdkb25lJzpcclxuICAgICAgICBzdGF0dXNDb2RlID0gMVxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG4gICAgdXBEYXRhLnR5cGUgPSB0eXBlTnVtYmVyXHJcbiAgICB1cERhdGEucGFnZVNpemUgPSAxMFxyXG4gICAgdXBEYXRhLnN0YXR1cyA9IHN0YXR1c0NvZGVcclxuICAgIGNvbnNvbGUubG9nKHVwRGF0YSlcclxuICAgIC8vIHBhZ2VTaXplOjEwLHR5cGU6dHlwZU51bWJlcixzdGF0dXM6c3RhdHVzQ29kZT9zdGF0dXNDb2RlOicnLHBhZ2U6ZGF0YS5wYWdlLG5hbWU6ZGF0YS5uYW1lP2RhdGEubmFtZTonJ1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cChgL2JhY2tlbmQvYXBpL2FuYWx5c2lzTGlzdGAsICdHRVQnLCB7IGRhdGE6IHVwRGF0YSB9LCAnYXV0aG9yaXR5JylcclxuICB9XHJcbiAgLyoqXHJcbiAgICogdXBGZWVkYmFja1xyXG4gICAqIOS4iuS8oOWPjemmiFxyXG4gICAqL1xyXG4gIHB1YmxpYyB1cEZlZWRiYWNrKGRhdGE6IHtcclxuICAgIGZlZWRiYWNrOiBzdHJpbmcsXHJcbiAgICBpbWFnZV91cmw6IEFycmF5PHN0cmluZz4sXHJcbiAgICBjYXRlZ29yeV9pZDogbnVtYmVyIHwgc3RyaW5nLFxyXG4gICAgZGVmdWN0X2lkOiBudW1iZXIgfCBzdHJpbmcsXHJcbiAgfSkge1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cCgnL2JhY2tlbmQvYXBpL2RvQWN0aW9uRmVlZGJhY2snLCAnUE9TVCcsIHsgZGF0YTogZGF0YSB9LCAnYXV0aG9yaXR5JylcclxuICB9XHJcbiAgLyoqXHJcbiAgICogbmV3QWN0aXZpdHlcclxuICAgKiDliJvlu7rmtLvliqhcclxuICAgKi9cclxuICBwdWJsaWMgbmV3QWN0aXZpdHkoZGF0YToge1xyXG4gICAgdGl0bGU6IHN0cmluZyxcclxuICAgIGltYWdlX3VybDogQXJyYXk8c3RyaW5nPixcclxuICAgIGFjdGl2aXR5X3R5cGU6IG51bWJlciB8IHN0cmluZyxcclxuICAgIHN0YXJ0X3RpbWU6IHN0cmluZyxcclxuICAgIGNvbnRlbnQ6IHN0cmluZyxcclxuICB9KSB7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwKGAvYmFja2VuZC9hcGkvYWN0aXZpdHkvY3JlYXRlYCwgJ1BPU1QnLCB7IGRhdGE6IGRhdGEgfSwgJ2F1dGhvcml0eScpXHJcbiAgfVxyXG4gIC8qKlxyXG4gICAqIGdldFN1bW1hcnlcclxuICAgKiDojrflj5bpl67popjmsYfmgLvmlbDmja5cclxuICAgKi9cclxuICBwdWJsaWMgZ2V0U3VtbWFyeSh0eXBlOiBtYWluVHlwZXxzdHJpbmcscGFnZTphbnksIHNpemU6YW55KSB7XHJcbiAgICBsZXQgdHlwZW51bWJlciA9IHRoaXMudHlwZUhhbmRsZSh0eXBlKVxyXG4gICAgcmV0dXJuIHRoaXMuaHR0cCgnL2JhY2tlbmQveGN4L3F1ZXN0aW9uUmFua2luZycsICdHRVQnLCB7IGRhdGE6IHsgdHlwZTogdHlwZW51bWJlciwgcGFnZTogcGFnZSwgcGFnZVNpemU6IHNpemUgfSB9LCAnYXV0aG9yaXR5JylcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIHJlY3RpZmljYXRpb25cclxuICAgKiDpl67popjliIbmnpAt6Zeu6aKY5rGH5oC7XHJcbiAgICovXHJcbiAgcHVibGljIHJlY3RpZmljYXRpb24odHlwZTogbWFpblR5cGV8c3RyaW5nKSB7XHJcbiAgICBsZXQgdHlwZW51bWJlciA9IHRoaXMudHlwZUhhbmRsZSh0eXBlKVxyXG4gICAgcmV0dXJuIHRoaXMuaHR0cCgnL2JhY2tlbmQveGN4L3JlY3RpZmljYXRpb24nLCAnR0VUJywgeyBkYXRhOiB7IHR5cGU6IHR5cGVudW1iZXIgfSB9LCAnYXV0aG9yaXR5JylcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIGdldFJhdGVcclxuICAgKiDpl67popjliIbmnpAt6L6+5qCH546HXHJcbiAgICovXHJcbiAgcHVibGljIGdldFJhdGUodHlwZTogbWFpblR5cGV8c3RyaW5nKSB7XHJcbiAgICBsZXQgdHlwZW51bWJlciA9IHRoaXMudHlwZUhhbmRsZSh0eXBlKVxyXG4gICAgcmV0dXJuIHRoaXMuaHR0cCgnL2JhY2tlbmQveGN4L3lpZWxkJywgJ0dFVCcsIHsgZGF0YTogeyB0eXBlOiB0eXBlbnVtYmVyIH0gfSwgJ2F1dGhvcml0eScpXHJcbiAgfVxyXG4gIC8qKlxyXG4gICAqIGdldE1hcFxyXG4gICAqIOiOt+WPluWcsOWbvuaOpeWPo1xyXG4gICAqL1xyXG4gIHB1YmxpYyBnZXRNYXAoKSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUscmVqZWN0KT0+e1xyXG4gICAgICB0aGlzLmh0dHAoYHhjeC9hcGkvbWFwYCwnR0VUJyx7fSwnYXV0aG9yaXR5JykudGhlbigocmVzOmFueSk9PntcclxuICAgICAgICBsZXQgb3V0UHV0ID0gPGFueT5bXVxyXG4gICAgICAgIGxldCBkYXRhID0gcmVzLmRhdGEucmVzdWx0XHJcbiAgICAgICAgZGF0YS5mb3JFYWNoKChlbGVtZW50OmFueSxpbmRleDpudW1iZXIpID0+IHtcclxuICAgICAgICAgIGxldCBwb2ludCA9IGVsZW1lbnQuY2VudGVyLnNwbGl0KCcsJylcclxuICAgICAgICAgIGxldCAgbG9uZ2l0dWRlID0gcG9pbnRbMF1cclxuICAgICAgICAgIGxldCAgbGF0aXR1ZGUgPSBwb2ludFsxXVxyXG4gICAgICAgICAgb3V0UHV0LnB1c2goe1xyXG4gICAgICAgICAgICBpZDppbmRleCxcclxuICAgICAgICAgICAgd2lkdGg6MjAsXHJcbiAgICAgICAgICAgIGhlaWdodDoyMCxcclxuICAgICAgICAgICAgbGF0aXR1ZGUsXHJcbiAgICAgICAgICAgIGxvbmdpdHVkZSxcclxuICAgICAgICAgICAgaWNvblBhdGg6ICcvc3RhdGljL21hcmtlckhvbWUucG5nJyxcclxuICAgICAgICAgICAgbGlzdDplbGVtZW50Lmxpc3QsXHJcbiAgICAgICAgICAgIGN1c3RvbUNhbGxvdXQ6IHtcclxuICAgICAgICAgICAgICBhbmNob3JZOiAxMCxcclxuICAgICAgICAgICAgICBhbmNob3JYOiAxMCxcclxuICAgICAgICAgICAgICBkaXNwbGF5OiAnQllDTElDSycsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJlc29sdmUob3V0UHV0KVxyXG4gICAgICB9LChlcnIpPT57XHJcbiAgICAgICAgcmVqZWN0KGVycilcclxuICAgICAgfSlcclxuICAgIH0pIFxyXG4gIH1cclxufVxyXG5jb25zdCBhcGkgPSBuZXcgQVBJXHJcbmV4cG9ydCBkZWZhdWx0IGFwaVxyXG5cclxuXHJcblxyXG5cclxuXHJcbi8vIGV4cG9ydCBkZWZhdWx0IGFwaTsiXX0=