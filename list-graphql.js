const {
    graphql,
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLList
} = require ('graphql');

const droids = [
    'C-3PO',
    'R2-D2',
    'HK-47',
    'IG-11',
    'OOM-9',
    'EV-9D9'
];

const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'RootQueryType',
        fields: {            
            droids: {
                type: GraphQLList(GraphQLString),
                resolve : () => droids
            } 
        }
    })
})

const query = '{ droids }'

graphql(schema, query).then(result => {
    console.log(result);
}).catch(err => {
    console.error(err);
});