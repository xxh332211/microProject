"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
Component({
    properties: {},
    data: {
        current: 'summary',
        type: 'unit',
    },
    methods: {
        changeTabs(e) {
            this.setData({
                current: e.detail.cell
            });
        }
    },
    attached() { },
    detached() { },
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBLFNBQVMsQ0FBQztJQUNSLFVBQVUsRUFBQyxFQUFFO0lBQ2IsSUFBSSxFQUFDO1FBQ0gsT0FBTyxFQUFnQyxTQUFTO1FBQ2hELElBQUksRUFBWSxNQUFNO0tBQ3ZCO0lBQ0QsT0FBTyxFQUFFO1FBQ1AsVUFBVSxDQUFDLENBQUs7WUFFZCxJQUFJLENBQUMsT0FBTyxDQUFDO2dCQUNYLE9BQU8sRUFBQyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUk7YUFDdEIsQ0FBQyxDQUFBO1FBQ0osQ0FBQztLQUNGO0lBQ0QsUUFBUSxLQUFJLENBQUM7SUFDYixRQUFRLEtBQUksQ0FBQztDQUNkLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbIi8vIHBhZ2VzL2F1ZGl0L3VuaXREZXRhaWwvaW5kZXguanNcclxuaW1wb3J0IHttYWluVHlwZX0gZnJvbSAnLi4vLi4vLi4vc2VydmljZS9uZXQuc2VydmljZSdcclxuQ29tcG9uZW50KHtcclxuICBwcm9wZXJ0aWVzOnt9LFxyXG4gIGRhdGE6e1xyXG4gICAgY3VycmVudDogPCdzdW1tYXJ5J3wnYW5hbHlzaXMnfCd0b3RhbCc+J3N1bW1hcnknLFxyXG4gICAgdHlwZTo8bWFpblR5cGU+ICd1bml0JyxcclxuICB9LFxyXG4gIG1ldGhvZHM6IHtcclxuICAgIGNoYW5nZVRhYnMoZTphbnkpe1xyXG4gICAgICBcclxuICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICBjdXJyZW50OmUuZGV0YWlsLmNlbGxcclxuICAgICAgfSlcclxuICAgIH1cclxuICB9LFxyXG4gIGF0dGFjaGVkKCkge30sXHJcbiAgZGV0YWNoZWQoKSB7fSxcclxufSlcclxuIl19