#pragma checksum "C:\laragon\www\asp\DoanNgocThuong_2122110111\DoanNgocThuong_2122110111\Views\Admin\ManageProducts.cshtml" "{8829d00f-11b8-4213-878b-770e8597ac16}" "5f68b380dd7f6363c415c9fcae1bdad91ce68bed2399aeff3c76c52eff833d10"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCoreGeneratedDocument.Views_Admin_ManageProducts), @"mvc.1.0.view", @"/Views/Admin/ManageProducts.cshtml")]
namespace AspNetCoreGeneratedDocument
{
    #line default
    using global::System;
    using global::System.Collections.Generic;
    using global::System.Linq;
    using global::System.Threading.Tasks;
    using global::Microsoft.AspNetCore.Mvc;
    using global::Microsoft.AspNetCore.Mvc.Rendering;
    using global::Microsoft.AspNetCore.Mvc.ViewFeatures;
    #line default
    #line hidden
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"Sha256", @"5f68b380dd7f6363c415c9fcae1bdad91ce68bed2399aeff3c76c52eff833d10", @"/Views/Admin/ManageProducts.cshtml")]
    #nullable restore
    internal sealed class Views_Admin_ManageProducts : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    #nullable disable
    {
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
#nullable restore
#line 1 "C:\laragon\www\asp\DoanNgocThuong_2122110111\DoanNgocThuong_2122110111\Views\Admin\ManageProducts.cshtml"
  
    Layout = "~/Views/Shared/_AdminLayout.cshtml";

#line default
#line hidden
#nullable disable

            WriteLiteral(@"
<h2>Manage Products</h2>
<button class=""btn btn-primary"" onclick=""showAddProductForm()"">Add Product</button>
<table id=""productTable"" border=""1"" cellpadding=""10"" cellspacing=""0"">
    <thead>
        <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Image</th>
            <th>Actions</th>
        </tr>
    </thead>
    <tbody>
        <!-- Dữ liệu sản phẩm sẽ được hiển thị ở đây -->
    </tbody>
</table>
<div id=""addProductContainer""></div>
<div id=""editProductContainer""></div>
<script src=""/js/adminManageProducts.js""></script>
<link rel=""stylesheet"" href=""/css/admin.css"">
");
        }
        #pragma warning restore 1998
        #nullable restore
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.ViewFeatures.IModelExpressionProvider ModelExpressionProvider { get; private set; } = default!;
        #nullable disable
        #nullable restore
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.IUrlHelper Url { get; private set; } = default!;
        #nullable disable
        #nullable restore
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.IViewComponentHelper Component { get; private set; } = default!;
        #nullable disable
        #nullable restore
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.Rendering.IJsonHelper Json { get; private set; } = default!;
        #nullable disable
        #nullable restore
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.Rendering.IHtmlHelper<dynamic> Html { get; private set; } = default!;
        #nullable disable
    }
}
#pragma warning restore 1591
