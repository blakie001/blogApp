const client = require("../config/elasticsearch");


exports.search = async(req, res) =>{
    const q = req.query.q;
    if(!q) return res.status(400).json("Query Perimeter is requried");

    try {
        const result = await client.search({
            index: "posts",
            body: {
                query: {
                    multi_match: {
                        query: q,
                        fields: ["title", "desc", "username", "category"],
                    }
                }
            }
        })
        const hits = result.hits.hits.map((hit) => hit._source);

        return res.status(200).json(hits);
    } catch (error) {
        console.error('Error searching posts:', error);
        return res.status(500).json({ error: 'Error searching posts' });    
    }
}