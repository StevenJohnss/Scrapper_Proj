
clean_html=(htm_js_page)=>{
    let foo =htm_js_page.match(/(?<=reports\s*).*?(?=\s*baseline)/gs)
    var str =foo[1]
    str=  str.slice(2) // remove the first dot
    str=  str.slice(0,str.length-1) // remove the last commma in obj
    str=  str.slice(0,str.length-13) +str.slice(str.length-2) // remove the last commma for array
    str=  str.slice(0,str.length-32) + str.slice(str.length-4) // remove the last commma for the objs
    str=  str.replace("label",'"label"')
    str=  str.replace("data",'"data"')
    final=""
     for(const i in str){
         if(str[i]=="x")  final+='"x"'
         else if(str[i]=="y") final+='"y"'
         else if(str[i]=="'") final+='"'
         else final+=str[i]
     }
    stat_obj= JSON.parse(final)
    return stat_obj
}

module.exports = clean_html