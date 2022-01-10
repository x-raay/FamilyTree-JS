/**
 * Any individual living in Lengaburu
 */
class Lengaburian{
    constructor(name){
        this.name = name;
        this.mother = null;
        this.spouse = null;
        this.gender = null;
    }

    findLenga(name, spouseFlag=false){
        let lengaFound;
        if(this.name == name)
            return this;
        if(this.spouse && !spouseFlag)
        {
            lengaFound = this.spouse.findLenga(name, true);
            if(lengaFound)
                return lengaFound;
        }

        if(this instanceof Male)
            return;
        for(let child in this.children){
            lengaFound = this.children[child].findLenga(name);
            if(!lengaFound)
                continue;
            return lengaFound;
        }
    }

    getSiblings(siblingGender){
        if(!this.mother)
            return []
        let siblingNames = [];
        for(let child in this.mother.children){
            if(this == this.mother.children[child])
                continue;
            if(siblingGender && this.mother.children[child].gender != siblingGender)
                continue;
            siblingNames.push(this.mother.children[child]);
        }
        return siblingNames;
    }

    getParentSiblings(parentGender, siblingGender){
        let parent;
        if(!this.mother)
            return
        if(this.mother.gender == parentGender)
            parent = this.mother
        else
            parent = this.mother.spouse
        if(!parent)
            return
        let parentsSiblings = parent.getSiblings(siblingGender);
        return parentsSiblings;
    }


    getSiblingsInLaw(gender){
        let inLaw = [];
        let spouse = this.spouse;
        if(spouse)
            {
                const siblings = spouse.getSiblings(gender);
                inLaw = inLaw.concat(siblings);
            }
        let siblings = this.getSiblings();
        for(let i in siblings){
            if(!inLaw.includes(siblings[i]) && siblings[i].spouse!=undefined)
                {
                    inLaw.push(siblings[i].spouse);
                }
        }
        return inLaw;
    }
}

/**
 * Male Lengaburian
 */
class Male extends Lengaburian{
    constructor(name){
        super();
        this.name = name;
        this.gender = "male";
    }

    getChildByGender(gender){
        if(!this.spouse){
            return
        }
        return this.spouse.getChildByGender(gender);
    }
}

/**
 * Female Lengaburian
 */
class Female extends Lengaburian{
    constructor(name){
        super();
        this.name = name;
        this.gender = "female";
        this.children = [];
    }

    addChild(child){
        this.children.push(child)
    }

    getChildByGender(gender){
        let kids = [];
        for(let child in this.children){
            if(this.children[child].gender == gender)
                {
                    kids.push(this.children[child].name);
                }
        }
        return kids;
    }
}

module.exports = {
    Male, Female
}