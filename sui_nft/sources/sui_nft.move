module sui_nft::sui_nft {
    use std::string::String;
    use sui::transfer;

    public struct NFT has key, store {
        id: UID,
        name: String,
        description: String,
        image_uri: String,
    }

    public entry fun mint(name: String, description: String, image_uri: String, recipient: address, ctx: &mut TxContext) {
        let nft = NFT {
            id: object::new(ctx),
            name: name,
            description: description,
            image_uri: image_uri,
        };
        transfer::public_transfer(nft, recipient);
    }
}
