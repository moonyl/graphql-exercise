const {
    graphql,
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
} = require ('graphql');

const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'RootQueryType',
        fields: {            
            droid: {
                type: GraphQLString,
                resolve() {
                    return 'C-3PO';
                }    
            } 
        }
    })
})

const query = '{ droid }'

graphql(schema, query).then(result => {
    console.log(result);
}).catch(err => {
    console.error(err);
});