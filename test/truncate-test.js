describe('truncate.js', function () {
  beforeEach(function () {
    var $fixture = this.$fixture = jQuery('<div/>');

    this.$fixture.css({
      visibility: 'hidden',
      font: 'normal 16px/20px Times',
      width: '250px'
    });

    this.$fixture.html("Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.");

    var testDefaults = {
      lineHeight: 20,
      lines: 1,
      ellipsis: '… ',
      showMore: '<a href="#">More</a>',
      showLess: '<a href="#">Less</a>'
    };

    this.run = function (options, useTestDefaults) {
      if (useTestDefaults || typeof useTestDefaults === 'undefined') {
        options = $.extend({}, testDefaults, options);
      }

      $fixture.truncate(options);
    };

    this.fixture = this.$fixture[0];
    document.body.appendChild(this.fixture);
  });

  afterEach(function () {
    this.fixture.parentNode.removeChild(this.fixture);
  });

  it('truncates nothing when content fits', function () {
    this.run({ lines: 10 });

    assert.equal(this.fixture.clientHeight, 200);
    assert.equal(this.$fixture.html(), "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.");
  });

  it('truncate correctly with default options', function () {
    this.run({ lines: 5, lineHeight: 20 }, false);

    assert.equal(this.fixture.clientHeight, 100);
    assert.equal(this.$fixture.html(), "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer too…");
  });

  it('truncate correctly when container has no margin or padding', function () {
    this.run({ lines: 5 });

    assert.equal(this.fixture.clientHeight, 100);
    assert.equal(this.$fixture.html(), "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown prin… <a href=\"#\">More</a>");
  });

  it('truncate correctly when container has margin', function () {
    this.$fixture.css({ margin: '20px' });
    this.run({ lines: 5 });

    assert.equal(this.fixture.clientHeight, 100);
    assert.equal(this.$fixture.html(), "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown prin… <a href=\"#\">More</a>");
  });

  it('truncate correctly when container has padding', function () {
    this.$fixture.css({ padding: '20px' });
    this.run({ lines: 5 });

    assert.equal(this.fixture.clientHeight, 140);
    assert.equal(this.$fixture.html(), "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown prin… <a href=\"#\">More</a>");
  });

  it('truncate correctly when container has margin and padding', function () {
    this.$fixture.css({ padding: '20px', margin: '20px' });
    this.run({ lines: 5 });

    assert.equal(this.fixture.clientHeight, 140);
    assert.equal(this.$fixture.html(), "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown prin… <a href=\"#\">More</a>");
  });

  it('truncate correctly when container has padding and border', function () {
    this.$fixture.css({ padding: '20px', border: '10px solid black' });
    this.run({ lines: 5 });

    assert.equal(this.fixture.clientHeight, 140);
    assert.equal(this.$fixture.html(), "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown prin… <a href=\"#\">More</a>");
  });

  describe('when box sizing is border-box', function () {
    beforeEach(function () {
      this.$fixture.css('box-sizing', 'border-box');
    });

    it('truncate correctly when container has margin', function () {
      this.$fixture.css({ margin: '20px' });
      this.run({ lines: 5 });

      assert.equal(this.fixture.clientHeight, 100);
      assert.equal(this.$fixture.html(), "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown prin… <a href=\"#\">More</a>");
    });

    it('truncate correctly when container has padding', function () {
      this.$fixture.css({ padding: '20px' });
      this.run({ lines: 5 });

      assert.equal(this.$fixture.html(), "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ev… <a href=\"#\">More</a>");
    });

    it('truncate correctly when container has margin and padding', function () {
      this.$fixture.css({ padding: '20px', margin: '20px' });
      this.run({ lines: 5 });

      assert.equal(this.$fixture.html(), "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ev… <a href=\"#\">More</a>");
    });

    it('truncate correctly when container has padding and border', function () {
      this.$fixture.css({ padding: '20px', border: '10px solid black' });
      this.run({ lines: 5 });

      assert.equal(this.$fixture.html(), "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard d… <a href=\"#\">More</a>");
    });
  });

  describe('when children elements are wrapped', function () {
    it('handles single block element wrap', function () {
      this.$fixture.html('<div>Members, friends, adversaries, competitors, and colleagues</div>');
      this.$fixture.css('width', '240px');

      this.run({ lines: 1});

      assert.equal(this.$fixture.html(), "<div>Members, friends, adversarie… <a href=\"#\">More</a></div>");
    });

    it('handles double block element wrap', function () {
      this.$fixture.html('<div><div>Members, friends, adversaries, competitors, and colleagues</div></div>');
      this.$fixture.css('width', '240px');

      this.run({ lines: 1});

      assert.equal(this.$fixture.html(), "<div><div>Members, friends, adversarie… <a href=\"#\">More</a></div></div>");
    });

    it('handles inline element wrap', function () {
      this.$fixture.html('<span><span>Members, friends, adversaries, competitors, and colleagues</span></span>');
      this.$fixture.css('width', '240px');

      this.run({ lines: 1});

      assert.equal(this.$fixture.html(), "<span><span>Members, friends, adversarie… <a href=\"#\">More</a></span></span>");
    });

    it('handles single block element with margin wrap', function () {
      this.$fixture.html('<p style="margin: 10px; padding: 0;">Members, friends, adversaries, competitors, and colleagues</p>');
      this.$fixture.css('width', '240px');

      this.run({ lines: 1});

      assert.equal(this.$fixture.html(), "<p style=\"margin: 10px; padding: 0;\">Members, friends, adversa… <a href=\"#\">More</a></p>");
    });
  });

  describe('when children elements are nested', function () {
    it('ignores comment nodes', function () {
      this.$fixture.html('Lorem Ipsum is simply dummy texts of the printing and typesettin<!--- test -->g industry.');
      this.$fixture.css('width', '240px');

      this.run({ lines: 2});

      assert.equal(this.$fixture.html(), "Lorem Ipsum is simply dummy texts of the printing and typesettin… <a href=\"#\">More</a>");
    });

    it('handles single break tags', function () {
      this.$fixture.html('<div>Members, friends, adversarie<br/>s, competitors, and colleagues</div>');
      this.$fixture.css('width', '240px');

      this.run({ lines: 1});

      assert.equal(this.$fixture.html(), "<div>Members, friends, adversarie… <a href=\"#\">More</a></div>");
    });

    it('handles double break tags', function () {
      this.$fixture.html('<div>Members, friends, adversarie<br/><br/>s, competitors, and colleagues</div>');
      this.$fixture.css('width', '240px');

      this.run({ lines: 1});

      assert.equal(this.$fixture.html(), "<div>Members, friends, adversarie… <a href=\"#\">More</a></div>");
    });

    it('leaves single level lists intact', function () {
      this.$fixture.html('<ul><li>Members</li><li>Friends</li><li>Adversaries</li></ul>');
      this.$fixture.css('width', '240px');

      this.run({ lines: 2});

      assert.equal(this.$fixture.html(), "<ul><li>Members</li><li>Friends… <a href=\"#\">More</a></li></ul>");
    });

    it('leaves double level lists intact', function () {
      this.$fixture.html('<ol><li>Members</li><li>Friends<ul><li>Noobs</li><li>Educators</li></ul></li><li>Adversaries</li></ol>');
      this.$fixture.css('width', '240px');

      this.run({ lines: 3});

      assert.equal(this.$fixture.html(), "<ol><li>Members</li><li>Friends<ul><li>Noobs… <a href=\"#\">More</a></li></ul></li></ol>");
    });
  });

  describe('.update()', function () {
    beforeEach(function () {
      this.run({ lines: 1, lineHeight: 20 });
    });

    it('truncates the new HTML', function () {
      this.$fixture.truncate('update', '<div>Members, friends, adversaries, competitors, and colleagues</div>');
      assert.equal(this.$fixture.html(), "<div>Members, friends, adversaries,… <a href=\"#\">More</a></div>");
    });
  });

  describe('.expand()', function () {
    beforeEach(function () {
      this.$fixture.html('<div>Members, friends, adversaries, competitors, and colleagues</div>');
      this.run({ lines: 1, lineHeight: 20 });
    });

    it('shows the original HTML', function () {
      assert.equal(this.$fixture.html(), "<div>Members, friends, adversaries,… <a href=\"#\">More</a></div>");
      this.$fixture.truncate('expand');
      assert.equal(this.$fixture.html(), "<div>Members, friends, adversaries, competitors, and colleagues</div><a href=\"#\">Less</a>");
    });
  });

  describe('.collapse()', function () {
    beforeEach(function () {
      this.$fixture.html('<div>Members, friends, adversaries, competitors, and colleagues</div>');
      this.run({ lines: 1, lineHeight: 20 });
      this.$fixture.truncate('expand');
    });

    it('shows the truncated HTML', function () {
      assert.equal(this.$fixture.html(), "<div>Members, friends, adversaries, competitors, and colleagues</div><a href=\"#\">Less</a>");
      this.$fixture.truncate('collapse');
      assert.equal(this.$fixture.html(), "<div>Members, friends, adversaries,… <a href=\"#\">More</a></div>");
    });
  });

});
