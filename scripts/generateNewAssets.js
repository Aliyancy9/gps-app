
const assetTypes = ["vehicle", "crane", "excavator"];

class Asset {

	constructor(){
		this.assetId = this.generateId();
		this.assetType = this.generateAssetType();
		this.lat = this.generateLat();
		this.lng = this.generateLng();
	}

	generateId(){
		let i =Math.round(Math.random() * 99999999) + 10000000;
		this.assetId =i;
		return this.assetId ; 
	}

	generateAssetType(){
		let i = Math.round(Math.random() * 2);
		this.assetType = assetTypes[i];
		return this.assetType;
	}

	generateLng(){

		let random = (Math.random()*180).toFixed(4);
	    
	    if (Math.random() >= 0.5) {
	        random = random * -1;
	    }

	    this.lng = random;

	    return this.lng;
	}

	generateLat(){

		let random = (Math.random()*90).toFixed(4);
	    
	    if (Math.random() >= 0.5) {
	        random = random * -1;
	    }

	    this.lat = random;
	    
	    return this.lat;
	}

}

let assets = [
	new Asset(),
	new Asset(),
	new Asset(),
	new Asset()];

console.log(JSON.stringify(assets));
