function Mock(app){
  app.get('/getSceneInfo',function(req,res){
    let sceneId = req.query.sceneId
    res.json({
      status: 0,
      message: 'get data',
      data: {
        sceneName: 'test',
        sceneId: sceneId
      }
    })
  })
}
module.exports = Mock