// Compiled by ClojureScript 1.7.170 {:static-fns true, :optimize-constants true}
goog.provide('reagent.impl.template');
goog.require('cljs.core');
goog.require('reagent.impl.util');
goog.require('reagent.impl.component');
goog.require('reagent.interop');
goog.require('reagent.ratom');
goog.require('reagent.impl.batching');
goog.require('clojure.string');
goog.require('reagent.debug');
/**
 * Regular expression that parses a CSS-style id and class
 *           from a tag name.
 */
reagent.impl.template.re_tag = /([^\s\.#]+)(?:#([^\s\.#]+))?(?:\.([^\s#]+))?/;

/**
* @constructor
*/
reagent.impl.template.NativeWrapper = (function (comp){
this.comp = comp;
})

reagent.impl.template.NativeWrapper.getBasis = (function (){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$comp], null);
});

reagent.impl.template.NativeWrapper.cljs$lang$type = true;

reagent.impl.template.NativeWrapper.cljs$lang$ctorStr = "reagent.impl.template/NativeWrapper";

reagent.impl.template.NativeWrapper.cljs$lang$ctorPrWriter = (function (this__5266__auto__,writer__5267__auto__,opt__5268__auto__){
return cljs.core._write(writer__5267__auto__,"reagent.impl.template/NativeWrapper");
});

reagent.impl.template.__GT_NativeWrapper = (function reagent$impl$template$__GT_NativeWrapper(comp){
return (new reagent.impl.template.NativeWrapper(comp));
});

reagent.impl.template.named_QMARK_ = (function reagent$impl$template$named_QMARK_(x){
return ((x instanceof cljs.core.Keyword)) || ((x instanceof cljs.core.Symbol));
});
reagent.impl.template.hiccup_tag_QMARK_ = (function reagent$impl$template$hiccup_tag_QMARK_(x){
var or__4668__auto__ = reagent.impl.template.named_QMARK_(x);
if(cljs.core.truth_(or__4668__auto__)){
return or__4668__auto__;
} else {
return typeof x === 'string';
}
});
reagent.impl.template.valid_tag_QMARK_ = (function reagent$impl$template$valid_tag_QMARK_(x){
var or__4668__auto__ = reagent.impl.template.hiccup_tag_QMARK_(x);
if(cljs.core.truth_(or__4668__auto__)){
return or__4668__auto__;
} else {
return (cljs.core.ifn_QMARK_(x)) || ((x instanceof reagent.impl.template.NativeWrapper));
}
});
reagent.impl.template.prop_name_cache = {"class": "className", "for": "htmlFor", "charset": "charSet"};
reagent.impl.template.obj_get = (function reagent$impl$template$obj_get(o,k){
if(cljs.core.truth_(o.hasOwnProperty(k))){
return (o[k]);
} else {
return null;
}
});
reagent.impl.template.cached_prop_name = (function reagent$impl$template$cached_prop_name(k){
if(cljs.core.truth_(reagent.impl.template.named_QMARK_(k))){
var temp__4427__auto__ = reagent.impl.template.obj_get(reagent.impl.template.prop_name_cache,cljs.core.name(k));
if((temp__4427__auto__ == null)){
return (reagent.impl.template.prop_name_cache[cljs.core.name(k)] = reagent.impl.util.dash_to_camel(k));
} else {
var k_SINGLEQUOTE_ = temp__4427__auto__;
return k_SINGLEQUOTE_;
}
} else {
return k;
}
});
reagent.impl.template.convert_prop_value = (function reagent$impl$template$convert_prop_value(x){
if((typeof x === 'string') || (typeof x === 'number') || (cljs.core.fn_QMARK_(x))){
return x;
} else {
if(cljs.core.truth_(reagent.impl.template.named_QMARK_(x))){
return cljs.core.name(x);
} else {
if(cljs.core.map_QMARK_(x)){
return cljs.core.reduce_kv((function (o,k,v){
var G__19026 = o;
(G__19026[reagent.impl.template.cached_prop_name(k)] = reagent$impl$template$convert_prop_value(v));

return G__19026;
}),{},x);
} else {
if(cljs.core.coll_QMARK_(x)){
return cljs.core.clj__GT_js(x);
} else {
if(cljs.core.ifn_QMARK_(x)){
return (function() { 
var G__19027__delegate = function (args){
return cljs.core.apply.cljs$core$IFn$_invoke$arity$2(x,args);
};
var G__19027 = function (var_args){
var args = null;
if (arguments.length > 0) {
var G__19028__i = 0, G__19028__a = new Array(arguments.length -  0);
while (G__19028__i < G__19028__a.length) {G__19028__a[G__19028__i] = arguments[G__19028__i + 0]; ++G__19028__i;}
  args = new cljs.core.IndexedSeq(G__19028__a,0);
} 
return G__19027__delegate.call(this,args);};
G__19027.cljs$lang$maxFixedArity = 0;
G__19027.cljs$lang$applyTo = (function (arglist__19029){
var args = cljs.core.seq(arglist__19029);
return G__19027__delegate(args);
});
G__19027.cljs$core$IFn$_invoke$arity$variadic = G__19027__delegate;
return G__19027;
})()
;
} else {
return cljs.core.clj__GT_js(x);

}
}
}
}
}
});
reagent.impl.template.set_id_class = (function reagent$impl$template$set_id_class(props,id,class$){
var p = (((props == null))?{}:props);
if((cljs.core.some_QMARK_(id)) && (((p["id"]) == null))){
(p["id"] = id);
} else {
}

if(cljs.core.some_QMARK_(class$)){
var old_19030 = (p["className"]);
(p["className"] = ((cljs.core.some_QMARK_(old_19030))?[cljs.core.str(class$),cljs.core.str(" "),cljs.core.str(old_19030)].join(''):class$));
} else {
}

return p;
});
reagent.impl.template.convert_props = (function reagent$impl$template$convert_props(props,id_class){
var id = (id_class["id"]);
var class$ = (id_class["className"]);
var no_id_class = ((id == null)) && ((class$ == null));
if((no_id_class) && (cljs.core.empty_QMARK_(props))){
return null;
} else {
var objprops = reagent.impl.template.convert_prop_value(props);
if(no_id_class){
return objprops;
} else {
return reagent.impl.template.set_id_class(objprops,id,class$);
}
}
});
reagent.impl.template.input_unmount = (function reagent$impl$template$input_unmount(this$){
return (this$["cljsInputValue"] = null);
});
reagent.impl.template.these_inputs_have_selection_api = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 6, ["url",null,"tel",null,"text",null,"textarea",null,"password",null,"search",null], null), null);
reagent.impl.template.has_selection_api_QMARK_ = (function reagent$impl$template$has_selection_api_QMARK_(input_type){
return cljs.core.contains_QMARK_(reagent.impl.template.these_inputs_have_selection_api,input_type);
});
reagent.impl.template.input_set_value = (function reagent$impl$template$input_set_value(this$){
var temp__4429__auto__ = (this$["cljsInputValue"]);
if((temp__4429__auto__ == null)){
return null;
} else {
var value = temp__4429__auto__;
(this$["cljsInputDirty"] = false);

var node = (this$["getDOMNode"])();
var node_value = (node["value"]);
if(cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(value,node_value)){
if(cljs.core.not((function (){var and__4656__auto__ = (node === document.activeElement);
if(and__4656__auto__){
var and__4656__auto____$1 = reagent.impl.template.has_selection_api_QMARK_((node["type"]));
if(cljs.core.truth_(and__4656__auto____$1)){
return (typeof value === 'string') && (typeof node_value === 'string');
} else {
return and__4656__auto____$1;
}
} else {
return and__4656__auto__;
}
})())){
return (node["value"] = value);
} else {
var existing_offset_from_end = (cljs.core.count(node_value) - (node["selectionStart"]));
var new_cursor_offset = (cljs.core.count(value) - existing_offset_from_end);
(node["value"] = value);

(node["selectionStart"] = new_cursor_offset);

return (node["selectionEnd"] = new_cursor_offset);
}
} else {
return null;
}
}
});
reagent.impl.template.input_handle_change = (function reagent$impl$template$input_handle_change(this$,on_change,e){
var res = (on_change.cljs$core$IFn$_invoke$arity$1 ? on_change.cljs$core$IFn$_invoke$arity$1(e) : on_change.call(null,e));
if(cljs.core.truth_((this$["cljsInputDirty"]))){
} else {
(this$["cljsInputDirty"] = true);

reagent.impl.batching.do_later(((function (res){
return (function (){
return reagent.impl.template.input_set_value(this$);
});})(res))
);
}

return res;
});
reagent.impl.template.input_render_setup = (function reagent$impl$template$input_render_setup(this$,jsprops){
if(cljs.core.truth_((function (){var and__4656__auto__ = (jsprops["hasOwnProperty"])("onChange");
if(cljs.core.truth_(and__4656__auto__)){
return (jsprops["hasOwnProperty"])("value");
} else {
return and__4656__auto__;
}
})())){
var v = (jsprops["value"]);
var value = (((v == null))?"":v);
var on_change = (jsprops["onChange"]);
(this$["cljsInputValue"] = value);

delete jsprops["value"];

var G__19033 = jsprops;
(G__19033["defaultValue"] = value);

(G__19033["onChange"] = ((function (G__19033,v,value,on_change){
return (function (p1__19031_SHARP_){
return reagent.impl.template.input_handle_change(this$,on_change,p1__19031_SHARP_);
});})(G__19033,v,value,on_change))
);

return G__19033;
} else {
return (this$["cljsInputValue"] = null);
}
});
reagent.impl.template.input_component_QMARK_ = (function reagent$impl$template$input_component_QMARK_(x){
return ((x === "input")) || ((x === "textarea"));
});
reagent.impl.template.reagent_input_class = null;
reagent.impl.template.make_element;
reagent.impl.template.input_spec = new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$display_DASH_name,"ReagentInput",cljs.core.cst$kw$component_DASH_did_DASH_update,reagent.impl.template.input_set_value,cljs.core.cst$kw$component_DASH_will_DASH_unmount,reagent.impl.template.input_unmount,cljs.core.cst$kw$reagent_DASH_render,(function (argv,comp,jsprops,first_child){
var this$ = reagent.impl.component._STAR_current_component_STAR_;
reagent.impl.template.input_render_setup(this$,jsprops);

return (reagent.impl.template.make_element.cljs$core$IFn$_invoke$arity$4 ? reagent.impl.template.make_element.cljs$core$IFn$_invoke$arity$4(argv,comp,jsprops,first_child) : reagent.impl.template.make_element.call(null,argv,comp,jsprops,first_child));
})], null);
reagent.impl.template.reagent_input = (function reagent$impl$template$reagent_input(){
if((reagent.impl.template.reagent_input_class == null)){
reagent.impl.template.reagent_input_class = reagent.impl.component.create_class(reagent.impl.template.input_spec);
} else {
}

return reagent.impl.template.reagent_input_class;
});
reagent.impl.template.parse_tag = (function reagent$impl$template$parse_tag(hiccup_tag){
var vec__19035 = cljs.core.next(cljs.core.re_matches(reagent.impl.template.re_tag,cljs.core.name(hiccup_tag)));
var tag = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19035,(0),null);
var id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19035,(1),null);
var class$ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19035,(2),null);
var class_SINGLEQUOTE_ = (cljs.core.truth_(class$)?clojure.string.replace(class$,/\./," "):null);
if(cljs.core.truth_(tag)){
} else {
throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str([cljs.core.str("Invalid tag: '"),cljs.core.str(hiccup_tag),cljs.core.str("'"),cljs.core.str(reagent.impl.component.comp_name())].join('')),cljs.core.str("\n"),cljs.core.str(cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.core.cst$sym$tag], 0)))].join('')));
}

return {"name": tag, "id": id, "className": class_SINGLEQUOTE_};
});
reagent.impl.template.fn_to_class = (function reagent$impl$template$fn_to_class(f){
if(cljs.core.ifn_QMARK_(f)){
} else {
throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str([cljs.core.str("Expected a function, not "),cljs.core.str(cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([f], 0)))].join('')),cljs.core.str("\n"),cljs.core.str(cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.core.list(cljs.core.cst$sym$ifn_QMARK_,cljs.core.cst$sym$f)], 0)))].join('')));
}

if((!(!((cljs.core.fn_QMARK_(f)) && (cljs.core.some_QMARK_((f["type"])))))) && (typeof console !== 'undefined')){
console.warn([cljs.core.str("Warning: "),cljs.core.str("Using native React classes directly in Hiccup forms "),cljs.core.str("is not supported. Use create-element or "),cljs.core.str("adapt-react-class instead: "),cljs.core.str((f["type"])),cljs.core.str(reagent.impl.component.comp_name())].join(''));
} else {
}

var spec = cljs.core.meta(f);
var withrender = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(spec,cljs.core.cst$kw$reagent_DASH_render,f);
var res = reagent.impl.component.create_class(withrender);
var wrapf = reagent.impl.util.cached_react_class(res);
reagent.impl.util.cache_react_class(f,wrapf);

return wrapf;
});
reagent.impl.template.as_class = (function reagent$impl$template$as_class(tag){
var temp__4427__auto__ = reagent.impl.util.cached_react_class(tag);
if((temp__4427__auto__ == null)){
return reagent.impl.template.fn_to_class(tag);
} else {
var cached_class = temp__4427__auto__;
return cached_class;
}
});
reagent.impl.template.get_key = (function reagent$impl$template$get_key(x){
if(cljs.core.map_QMARK_(x)){
try{return cljs.core.get.cljs$core$IFn$_invoke$arity$2(x,cljs.core.cst$kw$key);
}catch (e19037){var e = e19037;
return null;
}} else {
return null;
}
});
reagent.impl.template.key_from_vec = (function reagent$impl$template$key_from_vec(v){
var temp__4427__auto__ = (function (){var G__19039 = cljs.core.meta(v);
var G__19039__$1 = (((G__19039 == null))?null:reagent.impl.template.get_key(G__19039));
return G__19039__$1;
})();
if((temp__4427__auto__ == null)){
return reagent.impl.template.get_key(cljs.core.nth.cljs$core$IFn$_invoke$arity$3(v,(1),null));
} else {
var k = temp__4427__auto__;
return k;
}
});
reagent.impl.template.reag_element = (function reagent$impl$template$reag_element(tag,v){
var c = reagent.impl.template.as_class(tag);
var jsprops = {"argv": v};
var G__19041_19042 = v;
var G__19041_19043__$1 = (((G__19041_19042 == null))?null:reagent.impl.template.key_from_vec(G__19041_19042));
var G__19041_19044__$2 = (((G__19041_19043__$1 == null))?null:(jsprops["key"] = G__19041_19043__$1));

return (React["createElement"])(c,jsprops);
});
reagent.impl.template.adapt_react_class = (function reagent$impl$template$adapt_react_class(c){
return (new reagent.impl.template.NativeWrapper({"name": c, "id": null, "class": null}));
});
reagent.impl.template.tag_name_cache = {};
reagent.impl.template.cached_parse = (function reagent$impl$template$cached_parse(x){
var temp__4427__auto__ = reagent.impl.template.obj_get(reagent.impl.template.tag_name_cache,x);
if((temp__4427__auto__ == null)){
return (reagent.impl.template.tag_name_cache[x] = reagent.impl.template.parse_tag(x));
} else {
var s = temp__4427__auto__;
return s;
}
});
reagent.impl.template.as_element;
reagent.impl.template.native_element = (function reagent$impl$template$native_element(parsed,argv){
var comp = (parsed["name"]);
var props = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(argv,(1),null);
var hasprops = ((props == null)) || (cljs.core.map_QMARK_(props));
var jsprops = reagent.impl.template.convert_props(((hasprops)?props:null),parsed);
var first_child = ((hasprops)?(2):(1));
if(cljs.core.truth_(reagent.impl.template.input_component_QMARK_(comp))){
var G__19048 = cljs.core.with_meta(new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent.impl.template.reagent_input(),argv,comp,jsprops,first_child], null),cljs.core.meta(argv));
return (reagent.impl.template.as_element.cljs$core$IFn$_invoke$arity$1 ? reagent.impl.template.as_element.cljs$core$IFn$_invoke$arity$1(G__19048) : reagent.impl.template.as_element.call(null,G__19048));
} else {
var p = (function (){var temp__4427__auto__ = (function (){var G__19049 = cljs.core.meta(argv);
var G__19049__$1 = (((G__19049 == null))?null:reagent.impl.template.get_key(G__19049));
return G__19049__$1;
})();
if((temp__4427__auto__ == null)){
return jsprops;
} else {
var key = temp__4427__auto__;
var G__19050 = (((jsprops == null))?{}:jsprops);
(G__19050["key"] = key);

return G__19050;
}
})();
return (reagent.impl.template.make_element.cljs$core$IFn$_invoke$arity$4 ? reagent.impl.template.make_element.cljs$core$IFn$_invoke$arity$4(argv,comp,p,first_child) : reagent.impl.template.make_element.call(null,argv,comp,p,first_child));
}
});
reagent.impl.template.vec_to_elem = (function reagent$impl$template$vec_to_elem(v){
while(true){
if((cljs.core.count(v) > (0))){
} else {
throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str([cljs.core.str("Hiccup form should not be empty: "),cljs.core.str(cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([v], 0))),cljs.core.str(reagent.impl.component.comp_name())].join('')),cljs.core.str("\n"),cljs.core.str(cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.core.list(cljs.core.cst$sym$pos_QMARK_,cljs.core.list(cljs.core.cst$sym$count,cljs.core.cst$sym$v))], 0)))].join('')));
}

var tag = cljs.core.nth.cljs$core$IFn$_invoke$arity$2(v,(0));
if(cljs.core.truth_(reagent.impl.template.valid_tag_QMARK_(tag))){
} else {
throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str([cljs.core.str("Invalid Hiccup form: "),cljs.core.str(cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([v], 0))),cljs.core.str(reagent.impl.component.comp_name())].join('')),cljs.core.str("\n"),cljs.core.str(cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.core.list(cljs.core.cst$sym$valid_DASH_tag_QMARK_,cljs.core.cst$sym$tag)], 0)))].join('')));
}

if(cljs.core.truth_(reagent.impl.template.hiccup_tag_QMARK_(tag))){
var n = cljs.core.name(tag);
var pos = n.indexOf(">");
if((pos === (-1))){
return reagent.impl.template.native_element(reagent.impl.template.cached_parse(n),v);
} else {
var G__19051 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.subs.cljs$core$IFn$_invoke$arity$3(n,(0),pos),cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(v,(0),cljs.core.subs.cljs$core$IFn$_invoke$arity$2(n,(pos + (1))))], null);
v = G__19051;
continue;
}
} else {
if((tag instanceof reagent.impl.template.NativeWrapper)){
return reagent.impl.template.native_element(tag.comp,v);
} else {
return reagent.impl.template.reag_element(tag,v);

}
}
break;
}
});
reagent.impl.template.expand_seq;
reagent.impl.template.expand_seq_check;
reagent.impl.template.as_element = (function reagent$impl$template$as_element(x){
if(typeof x === 'string'){
return x;
} else {
if(cljs.core.vector_QMARK_(x)){
return reagent.impl.template.vec_to_elem(x);
} else {
if(cljs.core.seq_QMARK_(x)){
return (reagent.impl.template.expand_seq_check.cljs$core$IFn$_invoke$arity$1 ? reagent.impl.template.expand_seq_check.cljs$core$IFn$_invoke$arity$1(x) : reagent.impl.template.expand_seq_check.call(null,x));

} else {
return x;

}
}
}
});
reagent.impl.template.expand_seq = (function reagent$impl$template$expand_seq(s){
var a = cljs.core.into_array.cljs$core$IFn$_invoke$arity$1(s);
var n__5571__auto___19052 = a.length;
var i_19053 = (0);
while(true){
if((i_19053 < n__5571__auto___19052)){
(a[i_19053] = reagent.impl.template.as_element((a[i_19053])));

var G__19054 = (i_19053 + (1));
i_19053 = G__19054;
continue;
} else {
}
break;
}

return a;
});
reagent.impl.template.expand_seq_dev = (function reagent$impl$template$expand_seq_dev(s,o){
var a = cljs.core.into_array.cljs$core$IFn$_invoke$arity$1(s);
var n__5571__auto___19055 = a.length;
var i_19056 = (0);
while(true){
if((i_19056 < n__5571__auto___19055)){
var val_19057 = (a[i_19056]);
if((cljs.core.vector_QMARK_(val_19057)) && ((reagent.impl.template.key_from_vec(val_19057) == null))){
(o["no-key"] = true);
} else {
}

(a[i_19056] = reagent.impl.template.as_element(val_19057));

var G__19058 = (i_19056 + (1));
i_19056 = G__19058;
continue;
} else {
}
break;
}

return a;
});
reagent.impl.template.expand_seq_check = (function reagent$impl$template$expand_seq_check(x){
var ctx = {};
var res = (((reagent.ratom._STAR_ratom_context_STAR_ == null))?reagent.impl.template.expand_seq_dev(x,ctx):reagent.ratom.capture_derefed(((function (ctx){
return (function (){
return reagent.impl.template.expand_seq_dev(x,ctx);
});})(ctx))
,ctx));
if(cljs.core.truth_(reagent.ratom.captured(ctx))){
if(typeof console !== 'undefined'){
console.warn([cljs.core.str("Warning: "),cljs.core.str("Reactive deref not supported in lazy seq, "),cljs.core.str("it should be wrapped in doall"),cljs.core.str(reagent.impl.component.comp_name()),cljs.core.str(". Value:\n"),cljs.core.str(cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([x], 0)))].join(''));
} else {
}
} else {
}

if(cljs.core.truth_((function (){var and__4656__auto__ = cljs.core.not(reagent.impl.component._STAR_non_reactive_STAR_);
if(and__4656__auto__){
return (ctx["no-key"]);
} else {
return and__4656__auto__;
}
})())){
if(typeof console !== 'undefined'){
console.warn([cljs.core.str("Warning: "),cljs.core.str("Every element in a seq should have a unique "),cljs.core.str(":key"),cljs.core.str(reagent.impl.component.comp_name()),cljs.core.str(". Value: "),cljs.core.str(cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([x], 0)))].join(''));
} else {
}
} else {
}

return res;
});
reagent.impl.template.make_element = (function reagent$impl$template$make_element(argv,comp,jsprops,first_child){
var G__19060 = (cljs.core.count(argv) - first_child);
switch (G__19060) {
case (0):
return (React["createElement"])(comp,jsprops);

break;
case (1):
return (React["createElement"])(comp,jsprops,reagent.impl.template.as_element(cljs.core.nth.cljs$core$IFn$_invoke$arity$2(argv,first_child)));

break;
default:
return (React["createElement"]).apply(null,cljs.core.reduce_kv(((function (G__19060){
return (function (a,k,v){
if((k >= first_child)){
a.push(reagent.impl.template.as_element(v));
} else {
}

return a;
});})(G__19060))
,[comp,jsprops],argv));

}
});
