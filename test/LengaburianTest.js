let chai = require('chai');
const assert = chai.assert;
const FamilyTree = require('../src/FamilyTree');
const {Male, Female} = require('../src/Lengaburian');


describe("Male", function(){
    it("should create instance of Male", function () {
        const m = new Male('Shan');
        assert.isNotNull(m);
        assert.instanceOf(m, Male);
    });
})

describe("Female", function(){
    it("should create instance of Female", function () {
        const f = new Female('Anga');
        assert.isNotNull(f);
        assert.instanceOf(f, Female);
    });

    it("should get child by gender", function(){
        const f = new Female('Shan');
        f.addChild('testChild');
        assert.equal(1, f.children.length);
    });
})


describe("Lengaburian", function(){
    it(`Get siblings & return`, function(){
        const ft = new FamilyTree('Shan','Anga');
        const v = ft.root.findLenga("Vyas");
        
        const response = v.getSiblings("female");
        assert.isArray(response);
        assert.strictEqual(response[0].name, "Atya");
    });

    it(`Get siblings in law & return`, function(){
        const ft = new FamilyTree('Shan','Anga');
        const v = ft.root.findLenga("Vyas");
        
        const response = v.getSiblingsInLaw("female");
        assert.isArray(response);
        assert.strictEqual(response[0].name, "Satvy");
    });

    it(`Get parent siblings & return`, function(){
        const ft = new FamilyTree('Shan','Anga');
        const v = ft.root.findLenga("Vyas");
        
        const response = v.getParentSiblings("female");
        assert.isArray(response);
        assert.strictEqual(response[0].name, "Chit");
        assert.strictEqual(response[1].name, "Ish");
        assert.strictEqual(response[2].name, "Vich");
        assert.strictEqual(response[3].name, "Aras");
    });
});