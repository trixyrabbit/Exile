/*module.exports = function(deployer) {
  deployer.deploy(ConvertLib);
  deployer.autolink(); //sets up imports
  deployer.deploy(MetaCoin);
  //deployer.deploy(Canvas);
};
*/

module.exports = function(deployer) {
  deployer.deploy(ConvertLib);
  deployer.link(ConvertLib, MetaCoin);
  deployer.deploy(MetaCoin);
  deployer.deploy(CanvasFrag);
  deployer.link(CanvasFrag, Exile);
  deployer.deploy(Exile);
};
