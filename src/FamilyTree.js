const {Male, Female} = require('../src/Lengaburian');

class FamilyTree{
    constructor(maleName, femaleName){
        this.root = null;
        this.initialMembers(maleName, femaleName);
        this.setupFamilyTree();
    }

    initialMembers(maleName, femaleName){
        let maleLenga = new Male(maleName);
        let femaleLenga = new Female(femaleName);

        maleLenga.spouse = femaleLenga;
        femaleLenga.spouse = maleLenga;
        this.root = maleLenga; // male or female
    }

    createChild(childName, childGender){
        let child;
        if(childGender.toLowerCase() == 'male')
            child = new Male(childName);
        else if(childGender.toLowerCase() == 'female')
            child = new Female(childName);
        
        return child;
    }

    /**
     * 
     * @param {*} currentLenga starting point of the execution
     * @param {*} name name of the Lengaburian being searched
     * @param {*} spouseFlag flag to check if spouse is checked in the execution
     * @returns 
     */
    findLenga(currentLenga, name, spouseFlag = false){
        let found;
        if(name == currentLenga.name)
            return currentLenga;
        if(currentLenga.spouse && !spouseFlag){
            found = this.findLenga(currentLenga.spouse, name, true);
            if(found) return found;
        }

        if(currentLenga.gender == 'male') return;

        for(let child in currentLenga.children){
            found = this.findLenga(currentLenga.children[child], name);
            if(found) return found;
            else continue;
        }
    }

    /**
     * 
     * @param {*} name name of the Lenga/Person
     * @param {*} spouseName name of the spouse to be added
     * @returns boolean success or failure of execution
     */
    addSpouse(name, spouseName){
        let person = this.root.findLenga(name);
        let spouse;
        if(!person)
            {
                console.log(`PERSON_NOT_FOUND`); 
                return;
            }
        if(person.spouse)
            {
                console.log("SPOUSE_ADDITION_FAILED");
                return;
            }
        if(person.gender == 'male') 
            spouse = this.createChild(spouseName, "female");
        else
            spouse = this.createChild(spouseName, "male");
        
        person.spouse = spouse;
        spouse.spouse = person;

        return true;
    }

    /**
     * 
     * @param {*} motherName Name of mother
     * @param {*} childName Name of child
     * @param {*} childGender Gender of child (male or female)
     * @returns 
     */
    addChild(motherName, childName, childGender){
        let child = this.createChild(childName,childGender);
        let mother = this.root.findLenga(motherName);

        if(!mother){
            console.log('PERSON_NOT_FOUND');
            return;
        }
        if(mother.gender != 'female'){
            console.log('CHILD_ADDITION_FAILED');
            return;
        }

        child.mother = mother;
        mother.addChild(child);
        return true;
    }

    /**
     * Setup family tree already given in PDF
     */
    setupFamilyTree(){
        this.addChild("Anga", "Chit", "Male")
        this.addChild("Anga", "Ish", "Male")
        this.addChild("Anga", "Vich", "Male")
        this.addChild("Anga", "Aras", "Male")
        this.addChild("Anga", "Satya", "Female")
        this.addSpouse("Chit", "Amba")
        this.addSpouse("Vich", "Lika")
        this.addSpouse("Aras", "Chitra")
        this.addSpouse("Satya", "Vyan")
        this.addChild("Amba", "Dritha", "Female")
        this.addChild("Amba", "Tritha", "Female")
        this.addChild("Amba", "Vritha", "Male")
        this.addChild("Lika", "Vila", "Female")
        this.addChild("Lika", "Chika", "Female")
        this.addChild("Chitra", "Jnki", "Female")
        this.addChild("Chitra", "Ahit", "Male")
        this.addChild("Satya", "Asva", "Male")
        this.addChild("Satya", "Vyas", "Male")
        this.addChild("Satya", "Atya", "Female")
        this.addSpouse("Dritha", "Jaya")
        this.addSpouse("Jnki", "Arit")
        this.addSpouse("Asva", "Satvy")
        this.addSpouse("Vyas", "Krpi")
        this.addChild("Dritha", "Yodhan", "Male")
        this.addChild("Jnki", "Laki", "Male")
        this.addChild("Jnki", "Lavnya", "Female")
        this.addChild("Satvy", "Vasa", "Male")
        this.addChild("Krpi", "Kriya", "Male")
        this.addChild("Krpi", "Krithi", "Female")
    }
    
    getRelative(name, relationship){
        let relatives;
        let person = this.root.findLenga(name);
        if (!person)
            {console.log("PERSON_NOT_FOUND"); return;}
        relationship = relationship.toLowerCase()
        if(relationship == "son")
            relatives = person.getChildByGender("male");
        else if( relationship == "daughter")
            relatives = person.getChildByGender("female");
        else if( relationship == "siblings")
            relatives = person.getSiblings();
        else if( relationship == "paternal-uncle")
            relatives = person.getParentSiblings("male", "male");
        else if( relationship == "maternal-uncle")
            relatives = person.getParentSiblings("female", "male");
        else if( relationship == "paternal-aunt")
            relatives = person.getParentSiblings("male", "female");
        else if( relationship == "maternal-aunt")
            relatives = person.getParentSiblings("female", "female");
        else if( relationship == "sister-in-law")
            relatives = person.getSiblingsInLaw("female");
        else if( relationship == "brother-in-law")
            relatives = person.getSiblingsInLaw("male");
        else 
            {
                console.log("RELATIONSHIP_NOT_FOUND");
                return;
            }
        if(!relatives.length) 
            {
                console.log("NONE");
                return;
            }
            
        for(let i in relatives){
            console.log(relatives[i].name);
        }
    }

    /**
     * 
     * @param {*} data File contents
     */
    readFromFile(data){
        const lines = data.split(/\r?\n/);
        for(let line in lines){
            let words = lines[line].split(' ');
            if(!words){
                continue;
            }
            let command = words[0].toLowerCase();
            if(command == 'get_relationship' && words.length == 3)
                {
                    this.getRelative(words[1],words[2]);
                }
            else if(command == 'add_child' && words.length == 4)
                {
                    if(this.addChild(words[1],words[2],words[3]))
                        console.log('CHILD_ADDITION_SUCCEEDED');
                }
            else if(command == 'add_spouse' && words.length == 3)
                {
                    if(this.addSpouse(words[1],words[2]))
                        console.log('SPOUSE_ADDITION_SUCCEEDED');
                }
            else 
                console.log('WRONG_OPERATION');
        }
    }
}

module.exports = FamilyTree;