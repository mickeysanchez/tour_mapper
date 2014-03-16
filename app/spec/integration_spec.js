describe('Tour Mapper', function() {
  it('should be cool', function() {
    var cool = 'cool';

    expect(cool).toEqual('cool');
  });
  
  it('should have correct title', function() {
	  browser.get("/app/#");
	  
	  var title = $("title")
	  
	  expect(title.getInnerHtml()).toBe("Tour Mapper")
  });
});