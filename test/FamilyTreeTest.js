let chai = require('chai');
const assert = chai.assert;
const FamilyTree = require('../src/FamilyTree');
const {Male, Female} = require('../src/Lengaburian');


describe("FamilyTree", function(){
    it("should create instance of FamilyTree", function () {
        const ft = new FamilyTree('Shan','Anga');
        assert.isNotNull(ft);
        assert.instanceOf(ft, FamilyTree);
    });

    it("should create initial members of FamilyTree", function () {
        const ft = new FamilyTree('Shan','Anga');
        assert.isNotNull(ft);
        assert.instanceOf(ft, FamilyTree);
        assert.instanceOf(ft.root, Male);
        assert.notInstanceOf(ft.root, Female);
    });

    it("should create a new child & return", function(){
        const ft = new FamilyTree('Shan','Anga');
        const child = ft.createChild("testName","male");
        assert.isNotNull(child);
        assert.instanceOf(child, Male);
        assert.notInstanceOf(child, Female);
    });

    it("should find a lenga & return", function(){
        const ft = new FamilyTree('Shan','Anga');
        const lenga = ft.root.findLenga("Shan");
        assert.isNotNull(lenga);
    });

    it("should add spouse & return boolean", function(){
        const ft = new FamilyTree('Shan','Anga');
        const response = ft.addSpouse('Yodhan','Mimimi');
        assert.equal(response,true);
    });

    it("should add child return boolean", function(){
        const ft = new FamilyTree('Shan','Anga');
        const response = ft.addChild('Anga','testChild','male');
        assert.equal(response,true);
    });
    it("should get relative", function(){
        const ft = new FamilyTree('Shan','Anga');
        const response = ft.addChild('Anga','testChild','male');
        assert.equal(response,true);
    });
})