const flightDataType={
    cabintype:{
        head:{value:"1",text:"头等舱"},
        business:{value:"2",text:"商务舱"},
        economy:{value:"3",text:"经济舱"}
    },
    flightType:{
        adult:{value:"1",text:"成人"},
        kid:{value:"2",text:"儿童"}
    },
    paystatustype:{
        unpaid:{value:"1",text:"未支付"},
        haspaid:{value:"2",text:"已支付"},
        comfirm:{value:"4",text:"重新确认"},
        cancle:{value:"5",text:"已退票"}
    },
    toPaystatus(data){
        switch(data){
            case "1": return this.paystatustype.unpaid
            case "2": return this.paystatustype.haspaid
            case "4": return this.paystatustype.comfirm
            case "5": return this.paystatustype.cancle
        }
    },
    toCabinid(data){
        switch(data){
            case "1": return this.cabintype.head
            case "2": return this.cabintype.business
            case "3": return this.cabintype.ec
        }
    },
    toType(data){
        switch(data){
            case "1": return this.flightType.adult;
            case "2": return this.flightType.kid;
        }
    }	

}
export default flightDataType