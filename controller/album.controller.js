
class AlbumController{
    async create(req, res){
        res.json({message:'Albumcreate'})

    }
    async delete(req, res){
        res.json({message:'albumdelete'})
    }
    async update(req, res){
        res.json({message:'albumupdate'})
    }

}
module.exports = new AlbumController()