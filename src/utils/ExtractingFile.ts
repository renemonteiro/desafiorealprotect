import lineReader from "line-reader"

export default  function reader(){
    let dataArr:any[] = []
  
        lineReader.eachLine("nomeArquivoVriado.log", function(line:string, end:boolean){
            const month = line.slice(0,3)
            const day = line.slice(4,6) 
            const hour = line.slice(7,15)
            const ip = line.slice(16,32)
            const cronSSDH = line.slice(33,34)
            const message = line.slice(46)
            
            console.log(line)
            if(end){
                throw new Error("finish line")
            }
            
            try {
                dataArr.push(month, day, hour, ip, cronSSDH, message)
            } catch (error) {
                console.log(error)
            }
        })
    return dataArr
}
 
